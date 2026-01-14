import apiClient from "../api/apiClient";

export async function downloadPdf(title, data) {
  const res = await apiClient.post("/api/pdf", { title, data }, { responseType: "blob" });
  const blob = new Blob([res.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
}
