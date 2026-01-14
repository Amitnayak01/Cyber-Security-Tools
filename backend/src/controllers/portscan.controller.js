const { scanPorts } = require("../utils/portScanner");
const { addHistory } = require("./history.controller");

const DEFAULT_PORTS = [21, 22, 25, 53, 80, 110, 143, 443, 3306, 8080];

function parsePortRange(rangeStr) {
  const [start, end] = rangeStr.split("-").map((x) => parseInt(x, 10));
  if (!start || !end || start < 1 || end > 65535 || start > end) return null;
  const ports = [];
  for (let p = start; p <= end; p++) ports.push(p);
  return ports;
}

exports.portScanController = async (req, res) => {
  const { target, ports, range } = req.body;
  if (!target || typeof target !== "string") return res.status(400).json({ success: false, message: "Target (IP/domain) is required" });

  let scanList = DEFAULT_PORTS;

  if (Array.isArray(ports) && ports.length > 0) {
    scanList = ports.map((p) => parseInt(p, 10)).filter((p) => Number.isInteger(p) && p >= 1 && p <= 65535);
  } else if (typeof range === "string" && range.includes("-")) {
    const parsed = parsePortRange(range);
    if (!parsed) return res.status(400).json({ success: false, message: "Invalid range format (example: 1-100)" });
    if (parsed.length > 200) return res.status(400).json({ success: false, message: "Range too large. Max 200 ports per scan." });
    scanList = parsed;
  }

  if (scanList.length === 0) return res.status(400).json({ success: false, message: "No valid ports provided" });

  const host = target.trim();
  const results = await scanPorts(host, scanList);
  const openPorts = results.filter((r) => r.status === "open").map((r) => r.port);

  const payload = { target: host, scannedPorts: scanList, openPorts, details: results };

  if (req.user?.id) await addHistory({ userId: req.user.id, tool: "PORTSCAN", input: { target: host, ports: scanList }, output: payload, success: true });

  return res.json({ success: true, result: payload });
};
