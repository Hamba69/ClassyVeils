export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    return import("./instrumentation-node").then((mod) => mod.register());
  }
}
