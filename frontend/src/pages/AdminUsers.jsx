import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, UserPlus, RefreshCcw, Shield, Users } from "lucide-react";

import apiClient from "../api/apiClient";
import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";
import Page from "../components/Page";
import Skeleton from "../components/Skeleton";

export default function AdminUsers({ showToast, layout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create user form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // Loading skeleton UI
  function UsersSkeleton() {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="ui-card flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div className="min-w-[200px] space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/admin/users");
      setUsers(res.data.result || []);
    } catch (e) {
      showToast?.(e?.response?.data?.message || "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  }

  async function createUser() {
    if (!username.trim() || !password.trim()) {
      showToast?.("Username & password required", "error");
      return;
    }

    try {
      await apiClient.post("/api/admin/users", {
        username: username.trim(),
        password: password.trim(),
        role
      });

      showToast?.("User created ✅", "success");

      setUsername("");
      setPassword("");
      setRole("user");

      loadUsers();
    } catch (e) {
      showToast?.(e?.response?.data?.message || "Create user failed", "error");
    }
  }

  async function updateRole(userId, newRole) {
    try {
      await apiClient.patch(`/api/admin/users/${userId}/role`, { role: newRole });
      showToast?.("Role updated ✅", "success");
      loadUsers();
    } catch (e) {
      showToast?.(e?.response?.data?.message || "Role update failed", "error");
    }
  }

  async function deleteUser(userId) {
    const ok = confirm("Are you sure you want to delete this user?");
    if (!ok) return;

    try {
      await apiClient.delete(`/api/admin/users/${userId}`);
      showToast?.("User deleted ✅", "success");
      loadUsers();
    } catch (e) {
      showToast?.(e?.response?.data?.message || "Delete failed", "error");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Topbar
        title="User Management"
        onMenuClick={() => layout?.setDrawerOpen(true)}
      />

      <Page>
        {/* Header Card */}
        <div className="ui-card overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15">
                <Users />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-90">
                  Admin Panel
                </p>
                <h1 className="text-2xl font-black tracking-tight">
                  Manage Users & Roles
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm opacity-90">
              Create new users, assign roles (USER / ANALYST / ADMIN), and delete
              accounts.
            </p>
          </div>
        </div>

        {/* Create User */}
        <ToolCard
          title="Create User"
          subtitle="Add a new account and assign a role."
        >
          <div className="grid gap-3 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500 dark:text-gray-400">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="ui-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500 dark:text-gray-400">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="ui-input"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500 dark:text-gray-400">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="ui-input"
              >
                <option value="user">USER</option>
                <option value="analyst">ANALYST</option>
                <option value="admin">ADMIN</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={createUser}
                className="ui-btn-primary w-full"
              >
                <UserPlus size={18} />
                Create
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-xs text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-500/10 dark:text-indigo-200">
            <b>Tip:</b> Create Analyst accounts to enable URL Scan, Port Scan,
            WHOIS, and VirusTotal.
          </div>
        </ToolCard>

        {/* Users List */}
        <ToolCard
          title="Users List"
          subtitle="Manage roles and delete accounts."
        >
          {/* Header buttons */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Shield size={18} />
              Total Users: {users.length}
            </div>

            <button onClick={loadUsers} className="ui-btn-dark">
              <RefreshCcw size={18} />
              Refresh
            </button>
          </div>

          {/* List */}
          {loading ? (
            <UsersSkeleton />
          ) : (
            <div className="space-y-2 overflow-x-auto">
              {users.map((u, idx) => (
                <motion.div
                  key={u._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="ui-card flex min-w-[700px] flex-wrap items-center justify-between gap-3 p-4"
                >
                  {/* Left */}
                  <div className="min-w-[240px]">
                    <p className="text-sm font-black text-gray-900 dark:text-white">
                      {u.username}
                    </p>

                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Created: {new Date(u.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Middle */}
                  <div className="flex min-w-[260px] items-center gap-2">
                    <span className="ui-badge-neutral">Role</span>
                    <select
                      value={u.role}
                      onChange={(e) => updateRole(u._id, e.target.value)}
                      className="ui-input w-[160px]"
                    >
                      <option value="user">USER</option>
                      <option value="analyst">ANALYST</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="ui-btn-danger"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}

              {!users.length && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-[#0a0e1f] dark:text-gray-400">
                  No users found.
                </div>
              )}
            </div>
          )}
        </ToolCard>
      </Page>
    </>
  );
}
