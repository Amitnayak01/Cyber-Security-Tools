import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="grid min-h-[calc(100vh-72px)] place-items-center p-6">
        <div className="w-full max-w-xl ui-card p-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Access Platform
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              Sign in to Cyber Tools
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Use your admin / analyst / user credentials to access tools.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500 dark:text-gray-400">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="ui-input"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500 dark:text-gray-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ui-input"
                placeholder="Enter password"
              />
            </div>

            <button disabled={loading} className="ui-btn-primary w-full">
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-xs text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-500/10 dark:text-indigo-200">
            Tip: Start with <b>admin/admin123</b> then create Analyst accounts in Admin Panel.
          </div>
        </div>
      </div>
    </>
  );
}
