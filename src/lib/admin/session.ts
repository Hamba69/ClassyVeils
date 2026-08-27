import { Buffer } from "node:buffer";

export const ADMIN_SESSION_COOKIE = "classyveils_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  username: string;
  expiresAt: number;
};

function getCredential(name: "ADMIN_USERNAME" | "ADMIN_PASSWORD") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function constantTimeEqual(left: string, right: string) {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let mismatch = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    mismatch |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return mismatch === 0;
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getCredential("ADMIN_PASSWORD")),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Buffer.from(signature).toString("base64url");
}

export function credentialsAreValid(username: string, password: string) {
  return (
    constantTimeEqual(username, getCredential("ADMIN_USERNAME")) &&
    constantTimeEqual(password, getCredential("ADMIN_PASSWORD"))
  );
}

export async function createAdminSessionToken() {
  const payload: SessionPayload = {
    username: getCredential("ADMIN_USERNAME"),
    expiresAt: Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${await sign(encodedPayload)}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false;
  const [encodedPayload, suppliedSignature, extra] = token.split(".");
  if (!encodedPayload || !suppliedSignature || extra) return false;

  const expectedSignature = await sign(encodedPayload);
  if (!constantTimeEqual(suppliedSignature, expectedSignature)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;
    return (
      constantTimeEqual(payload.username, getCredential("ADMIN_USERNAME")) &&
      Number.isFinite(payload.expiresAt) &&
      payload.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}
