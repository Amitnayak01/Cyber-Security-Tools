import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";
import { useAuth } from "../context/AuthContext";

export default function Login({ showToast }) {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      showToast?.("Login successful ✅", "success");
      nav("/");
    } catch (e) {
      showToast?.(e?.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Topbar title="Login" />
      <div className="p-6">
        <ToolCard title="Login">
          <form onSubmit={submit} className="space-y-3">
            <input value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-white" />
            <button disabled={loading} className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-black">{loading?"Logging in...":"Login"}</button>
          </form>
        </ToolCard>
      </div>
    </>
  );
}
