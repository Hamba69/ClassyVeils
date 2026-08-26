import dns from "node:dns";

export function register() {
  dns.setDefaultResultOrder("ipv4first");
}
