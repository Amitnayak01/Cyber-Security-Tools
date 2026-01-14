import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";

export default function AdminUsers({ showToast }) {
  const [users,setUsers]=useState([]);
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("user");

  async function load(){
    const res=await apiClient.get("/api/admin/users");
    setUsers(res.data.result);
  }
  async function create(){
    try{await apiClient.post("/api/admin/users",{username,password,role});showToast?.("Created ✅","success");setUsername("");setPassword("");setRole("user");load();}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }
  async function updateRole(id,newRole){
    try{await apiClient.patch(`/api/admin/users/${id}/role`,{role:newRole});showToast?.("Role updated ✅","success");load();}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }
  async function del(id){
    try{await apiClient.delete(`/api/admin/users/${id}`);showToast?.("Deleted ✅","success");load();}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
  }
  useEffect(()=>{load();},[]);
  return (
    <>
      <Topbar title="User Management" />
      <div className="p-6 space-y-6">
        <ToolCard title="Create User">
          <div className="grid gap-2 md:grid-cols-4">
            <input value={username} onChange={(e)=>setUsername(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="username"/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" placeholder="password"/>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white">
              <option value="user">USER</option><option value="analyst">ANALYST</option><option value="admin">ADMIN</option>
            </select>
            <button onClick={create} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Create</button>
          </div>
        </ToolCard>
        <ToolCard title="Users">
          <div className="space-y-2">
            {users.map(u=>(
              <div key={u._id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gray-200 p-3 text-sm dark:border-gray-800">
                <div><b className="dark:text-white">{u.username}</b><div className="text-xs text-gray-500 dark:text-gray-400">{u.role}</div></div>
                <div className="flex gap-2">
                  <select value={u.role} onChange={(e)=>updateRole(u._id,e.target.value)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white">
                    <option value="user">USER</option><option value="analyst">ANALYST</option><option value="admin">ADMIN</option>
                  </select>
                  <button onClick={()=>del(u._id)} className="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </ToolCard>
      </div>
    </>
  );
}
