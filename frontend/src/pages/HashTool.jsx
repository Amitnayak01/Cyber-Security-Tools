import { useState } from "react";
import apiClient from "../api/apiClient";
import CopyButton from "../components/CopyButton";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";

export default function HashTool({ showToast }) {
  const [text,setText]=useState("");
  const [algorithm,setAlgorithm]=useState("SHA256");
  const [hash,setHash]=useState("");

  async function generate(){
    setHash("");
    try{
      const res=await apiClient.post("/api/hash/generate",{text,algorithm});
      setHash(res.data.result.hash);
      showToast?.("Hash generated ✅","success");
    }catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }

  return (
    <>
      <Topbar title="Hash Generator" />
      <div className="p-6 space-y-6">
        <ToolCard title="Generate">
          <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
          <div className="mt-3 flex gap-2 flex-wrap">
            <select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white">
              <option>MD5</option><option>SHA1</option><option>SHA256</option><option>SHA512</option>
            </select>
            <button onClick={generate} disabled={!text} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Generate</button>
          </div>
        </ToolCard>
        {hash && <ToolCard title="Output"><div className="flex justify-between items-center"><span className="text-sm font-semibold dark:text-white">{algorithm}</span><CopyButton text={hash}/></div><pre className="mt-3 rounded-xl bg-gray-100 p-3 text-xs dark:bg-gray-900 dark:text-gray-200">{hash}</pre></ToolCard>}
      </div>
    </>
  );
}
