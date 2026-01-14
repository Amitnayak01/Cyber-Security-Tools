import { useState } from "react";
import apiClient from "../api/apiClient";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";
import { downloadPdf } from "../utils/downloadPdf";

export default function PortScannerTool({ showToast }) {
  const [target,setTarget]=useState("example.com");
  const [mode,setMode]=useState("COMMON");
  const [ports,setPorts]=useState("22,80,443");
  const [range,setRange]=useState("1-100");
  const [result,setResult]=useState(null);

  async function scan(){
    const body={target};
    if(mode==="CUSTOM") body.ports=ports.split(",").map(p=>parseInt(p.trim(),10)).filter(Boolean);
    if(mode==="RANGE") body.range=range;
    try{const res=await apiClient.post("/api/portscan",body);setResult(res.data.result);showToast?.("Scan done ✅","success");}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }

  return (
    <>
      <Topbar title="Port Scanner" />
      <div className="p-6 space-y-6">
        <ToolCard title="Advanced Scan">
          <input value={target} onChange={(e)=>setTarget(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="domain/IP"/>
          <div className="mt-3 flex gap-2 flex-wrap">
            <select value={mode} onChange={(e)=>setMode(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white">
              <option value="COMMON">Common</option><option value="CUSTOM">Custom</option><option value="RANGE">Range</option>
            </select>
            {mode==="CUSTOM" && <input value={ports} onChange={(e)=>setPorts(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="22,80,443"/>}
            {mode==="RANGE" && <input value={range} onChange={(e)=>setRange(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="1-100"/>}
            <button onClick={scan} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Scan</button>
          </div>
        </ToolCard>
        {result && <ToolCard title="Result"><button onClick={()=>downloadPdf("Port_Scan",result)} className="mb-3 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Export PDF</button><pre className="rounded-xl bg-gray-100 p-3 text-xs dark:bg-gray-900 dark:text-gray-200">{JSON.stringify(result,null,2)}</pre></ToolCard>}
      </div>
    </>
  );
}
