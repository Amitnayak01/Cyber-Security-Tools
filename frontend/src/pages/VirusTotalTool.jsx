import { useState } from "react";
import apiClient from "../api/apiClient";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";

export default function VirusTotalTool({ showToast }) {
  const [url,setUrl]=useState("https://example.com");
  const [result,setResult]=useState(null);

  async function scan(){
    try{const res=await apiClient.post("/api/virustotal/url",{url});setResult(res.data.result);showToast?.("VirusTotal done ✅","success");}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }
  return (
    <>
      <Topbar title="VirusTotal" />
      <div className="p-6 space-y-6">
        <ToolCard title="Scan">
          <input value={url} onChange={(e)=>setUrl(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white"/>
          <button onClick={scan} className="mt-3 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Scan</button>
        </ToolCard>
        {result && <ToolCard title="Result"><pre className="rounded-xl bg-gray-100 p-3 text-xs dark:bg-gray-900 dark:text-gray-200">{JSON.stringify(result,null,2)}</pre></ToolCard>}
      </div>
    </>
  );
}
