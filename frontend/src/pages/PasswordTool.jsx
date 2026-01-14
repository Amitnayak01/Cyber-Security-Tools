import { useState } from "react";
import apiClient from "../api/apiClient";
import Loader from "../components/Loader";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";

export default function PasswordTool({ showToast }) {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkStrength() {
    setLoading(true); setResult(null);
    try {
      const res = await apiClient.post("/api/password/check", { password });
      setResult(res.data.result);
      showToast?.("Password checked ✅","success");
    } catch (e) {
      showToast?.(e?.response?.data?.message || "Failed","error");
    } finally { setLoading(false); }
  }

  return (
    <>
      <Topbar title="Password Strength" />
      <div className="p-6 space-y-6">
        <ToolCard title="Check">
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="Enter password" />
          <button onClick={checkStrength} disabled={!password||loading} className="mt-3 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-black">Check</button>
          {loading && <div className="mt-3"><Loader text="Checking..." /></div>}
        </ToolCard>
        {result && <ToolCard title="Result"><pre className="rounded-xl bg-gray-100 p-3 text-xs dark:bg-gray-900 dark:text-gray-200">{JSON.stringify(result,null,2)}</pre></ToolCard>}
      </div>
    </>
  );
}
