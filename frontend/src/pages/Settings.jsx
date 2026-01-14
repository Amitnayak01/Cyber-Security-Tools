import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";

export default function Settings({ showToast }) {
  const [settings,setSettings]=useState([]);
  const [key,setKey]=useState("VIRUSTOTAL_API_KEY");
  const [value,setValue]=useState("");

  async function load(){
    const res=await apiClient.get("/api/settings");
    setSettings(res.data.result);
  }
  async function save(){
    try{await apiClient.put("/api/settings",{key,value});showToast?.("Saved ✅","success");setValue("");load();}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }
  useEffect(()=>{load();},[]);
  return (
    <>
      <Topbar title="Settings" />
      <div className="p-6 space-y-6">
        <ToolCard title="Update Key">
          <div className="grid gap-2 md:grid-cols-3">
            <input value={key} onChange={(e)=>setKey(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white"/>
            <input value={value} onChange={(e)=>setValue(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="new value"/>
            <button onClick={save} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Save</button>
          </div>
        </ToolCard>
        <ToolCard title="Current">
          <div className="space-y-2 text-sm">
            {settings.map(s=>(
              <div key={s._id} className="rounded-xl border border-gray-200 p-3 dark:border-gray-800">
                <b className="dark:text-white">{s.key}</b>
                <div className="text-xs text-gray-500 dark:text-gray-400">{s.valueMasked}</div>
              </div>
            ))}
          </div>
        </ToolCard>
      </div>
    </>
  );
}
