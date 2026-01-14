import { useState } from "react";
import apiClient from "../api/apiClient";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";

export default function WhoisTool({ showToast }) {
  const [domain,setDomain]=useState("example.com");
  const [result,setResult]=useState(null);

  async function lookup(){
    try{const res=await apiClient.post("/api/whois",{domain});setResult(res.data.result);showToast?.("WHOIS fetched ✅","success");}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }
  return (
    <>
      <Topbar title="WHOIS" />
      <div className="p-6 space-y-6">
        <ToolCard title="Lookup">
          <input value={domain} onChange={(e)=>setDomain(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white"/>
          <button onClick={lookup} className="mt-3 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Lookup</button>
        </ToolCard>
        {result && <ToolCard title="Result"><pre className="rounded-xl bg-gray-100 p-3 text-xs dark:bg-gray-900 dark:text-gray-200">{JSON.stringify(result,null,2)}</pre></ToolCard>}
      </div>
    </>
  );
}
