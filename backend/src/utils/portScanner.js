const net = require("net");

function scanPort(host, port, timeout = 800) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = "closed";

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      status = "open";
      socket.destroy();
    });

    socket.on("timeout", () => socket.destroy());
    socket.on("error", () => (status = "closed"));

    socket.on("close", () => resolve({ port, status }));

    socket.connect(port, host);
  });
}

async function scanPorts(host, ports = []) {
  const results = [];
  for (const p of ports) {
    const r = await scanPort(host, p);
    results.push(r);
  }
  return results;
}

module.exports = { scanPorts };
