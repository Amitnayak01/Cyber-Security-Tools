import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";
import Loader from "../components/Loader";

export default function History({ showToast }) {
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(false);

  async function load(){
    setLoading(true);
    try{const res=await apiClient.get("/api/history");setItems(res.data.result);}
    catch{showToast?.("Failed to load history","error");}
    finally{setLoading(false);}
  }
  async function clear(){
    try{await apiClient.delete("/api/history");setItems([]);showToast?.("Cleared ✅","success");}
    catch{showToast?.("Clear failed","error");}
  }
  useEffect(()=>{load();},[]);
  return (
    <>
      <Topbar title="History" />
      <div className="p-6 space-y-6">
        <ToolCard title="Logs">
          <div className="flex gap-2 mb-3">
            <button onClick={load} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Refresh</button>
            <button onClick={clear} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white">Clear</button>
          </div>
          {loading && <Loader text="Loading..." />}
          <div className="space-y-2">
            {items.map(i=>(
              <div key={i._id} className="rounded-xl border border-gray-200 p-3 text-xs dark:border-gray-800">
                <b className="dark:text-white">{i.tool}</b> - {new Date(i.createdAt).toLocaleString()}
                <pre className="mt-2 rounded-xl bg-gray-100 p-2 dark:bg-gray-900 dark:text-gray-200 overflow-x-auto">{JSON.stringify({input:i.input,output:i.output},null,2)}</pre>
              </div>
            ))}
          </div>
        </ToolCard>
      </div>
    </>
  );
}
