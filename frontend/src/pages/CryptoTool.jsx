import { useState } from "react";
import apiClient from "../api/apiClient";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";

export default function CryptoTool({ showToast }) {
  const [text,setText]=useState("");
  const [key,setKey]=useState("");
  const [encrypted,setEncrypted]=useState("");
  const [decrypted,setDecrypted]=useState("");

  async function encrypt(){
    try{const res=await apiClient.post("/api/crypto/encrypt",{text,key});setEncrypted(res.data.result.encrypted);setDecrypted("");showToast?.("Encrypted ✅","success");}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }
  async function decrypt(){
    try{const res=await apiClient.post("/api/crypto/decrypt",{encryptedText:encrypted,key});setDecrypted(res.data.result.decrypted);showToast?.("Decrypted ✅","success");}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }

  return (
    <>
      <Topbar title="AES Crypto" />
      <div className="p-6 space-y-6">
        <ToolCard title="Encrypt/Decrypt">
          <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="Text"/>
          <input value={key} onChange={(e)=>setKey(e.target.value)} className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="Secret key"/>
          <div className="mt-3 flex gap-2">
            <button onClick={encrypt} disabled={!text||!key} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Encrypt</button>
            <button onClick={decrypt} disabled={!encrypted||!key} className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white">Decrypt</button>
          </div>
        </ToolCard>
        {encrypted && <ToolCard title="Encrypted"><pre className="rounded-xl bg-gray-100 p-3 text-xs dark:bg-gray-900 dark:text-gray-200">{encrypted}</pre></ToolCard>}
        {decrypted && <ToolCard title="Decrypted"><pre className="rounded-xl bg-gray-100 p-3 text-xs dark:bg-gray-900 dark:text-gray-200">{decrypted}</pre></ToolCard>}
      </div>
    </>
  );
}
