const PDFDocument = require("pdfkit");
const { addHistory } = require("./history.controller");

exports.generatePdf = async (req, res) => {
  const { title, data } = req.body;
  if (!title || !data) return res.status(400).json({ success: false, message: "title and data are required" });

  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${title}.pdf"`);

  doc.pipe(res);

  doc.fontSize(18).text("Cyber Security Tools Report", { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Title: ${title}`);
  doc.text(`Generated At: ${new Date().toLocaleString()}`);
  doc.moveDown(1);
  doc.fontSize(12).text("Result Data:", { underline: true });
  doc.moveDown(0.5);
  doc.font("Courier").fontSize(10).text(JSON.stringify(data, null, 2));

  doc.end();

  if (req.user?.id) await addHistory({ userId: req.user.id, tool: "PDF", input: { title }, output: { ok: true }, success: true });
};
