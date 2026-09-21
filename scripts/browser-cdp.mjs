export async function browserPage() {
  const target = await (await fetch("http://127.0.0.1:9333/json/new?about:blank", { method: "PUT" })).json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let next = 0;
  const pending = new Map();
  const errors = [];
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const p = pending.get(message.id);
      if (p) { pending.delete(message.id); clearTimeout(p.timer); if (message.error) p.reject(new Error(message.error.message)); else p.resolve(message.result); }
    }
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") errors.push(message.params.args.map((arg) => arg.value || arg.description).join(" "));
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++next;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error("CDP timeout: " + method)); }, 25000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const wait = async (expression, timeout = 15000) => {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      try { if (await evaluate(expression)) return; } catch {}
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error("Wait failed: " + expression);
  };
  const go = async (path) => {
    await send("Page.navigate", { url: "http://localhost:3123" + path });
    await wait("document.readyState === 'complete' && !!document.querySelector('.cv-header') && document.querySelector('.cv-header-picks')?.disabled === false");
  };
  await send("Page.enable"); await send("Runtime.enable");
  return { target, send, evaluate, wait, go, errors, close: async () => { socket.close(); await fetch("http://127.0.0.1:9333/json/close/" + target.id); } };
}
