import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutDashboard,
  KeyRound,
  Hash,
  Lock,
  Globe,
  Radar,
  Database,
  ShieldCheck,
  History,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

function LinkItem({ to, label, icon, collapsed, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
          isActive
            ? "bg-indigo-600 text-white shadow"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
        }`
      }
    >
      <span className="opacity-90">{icon}</span>
      {!collapsed && <span className="flex-1">{label}</span>}
      {!collapsed && (
        <span className="text-xs opacity-0 group-hover:opacity-100">→</span>
      )}
    </NavLink>
  );
}

function SidebarContent({
  dark,
  setDark,
  collapsed,
  setCollapsed,
  closeDrawer
}) {
  const { user, logout } = useAuth();
  const role = user?.role || "guest";

  const commonLinks = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/password", label: "Password Strength", icon: <KeyRound size={18} /> },
    { to: "/hash", label: "Hash Generator", icon: <Hash size={18} /> },
    { to: "/crypto", label: "Encryption / Decryption", icon: <Lock size={18} /> }
  ];

  const analystLinks = [
    { to: "/url-scanner", label: "URL Scanner", icon: <Globe size={18} /> },
    { to: "/port-scanner", label: "Port Scanner", icon: <Radar size={18} /> },
    { to: "/whois", label: "WHOIS Lookup", icon: <Database size={18} /> },
    { to: "/virustotal", label: "VirusTotal Scan", icon: <ShieldCheck size={18} /> },
    { to: "/history", label: "History", icon: <History size={18} /> }
  ];

  const adminLinks = [
    { to: "/admin-dashboard", label: "Admin Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/admin-users", label: "User Management", icon: <Users size={18} /> },
    { to: "/settings", label: "API Key Settings", icon: <Settings size={18} /> }
  ];

  const canAccessAnalyst = role === "analyst" || role === "admin";
  const canAccessAdmin = role === "admin";

  return (
    <div className="flex h-full flex-col p-4">
      {/* Logo + collapse */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-white shadow">
            🛡️
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
                Cyber Tools
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Responsive Dashboard
              </p>
            </div>
          )}
        </div>

        {/* ✅ Desktop collapse button */}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="hidden rounded-xl border border-gray-200 bg-white p-2 text-gray-800 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900 md:inline-flex"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setDark((p) => !p)}
        className="mb-4 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Profile */}
      <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#0a0e1f]">
        {!collapsed ? (
          <>
            <p className="text-xs text-gray-500 dark:text-gray-400">Logged in as</p>
            <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
              {user ? user.username : "Guest"}
            </p>
            <div className="mt-2">
              <span className="ui-badge-neutral">
                Role: {user ? role.toUpperCase() : "GUEST"}
              </span>
            </div>
            {user && (
              <button onClick={logout} className="ui-btn-danger mt-4 w-full">
                Logout
              </button>
            )}
          </>
        ) : (
          <div className="text-center text-xs font-bold text-gray-700 dark:text-gray-300">
            {user ? role.toUpperCase() : "GUEST"}
          </div>
        )}
      </div>

      {/* Links */}
      <div className="flex-1 space-y-6 overflow-y-auto pb-6">
        <div>
          {!collapsed && (
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Tools
            </p>
          )}
          <div className="space-y-1">
            {commonLinks.map((l) => (
              <LinkItem
                key={l.to}
                to={l.to}
                label={l.label}
                icon={l.icon}
                collapsed={collapsed}
                onClick={closeDrawer}
              />
            ))}
          </div>
        </div>

        {canAccessAnalyst && (
          <div>
            {!collapsed && (
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Analyst Tools
              </p>
            )}
            <div className="space-y-1">
              {analystLinks.map((l) => (
                <LinkItem
                  key={l.to}
                  to={l.to}
                  label={l.label}
                  icon={l.icon}
                  collapsed={collapsed}
                  onClick={closeDrawer}
                />
              ))}
            </div>
          </div>
        )}

        {canAccessAdmin && (
          <div>
            {!collapsed && (
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Admin
              </p>
            )}
            <div className="space-y-1">
              {adminLinks.map((l) => (
                <LinkItem
                  key={l.to}
                  to={l.to}
                  label={l.label}
                  icon={l.icon}
                  collapsed={collapsed}
                  onClick={closeDrawer}
                />
              ))}
            </div>
          </div>
        )}

        {!user && (
          <div>
            {!collapsed && (
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Account
              </p>
            )}
            <LinkItem
              to="/login"
              label="Login"
              icon={<KeyRound size={18} />}
              collapsed={collapsed}
              onClick={closeDrawer}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({
  dark,
  setDark,
  collapsed,
  setCollapsed,
  drawerOpen,
  setDrawerOpen
}) {
  // ✅ Desktop sidebar
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-[#070a16]/70 md:block ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent
          dark={dark}
          setDark={setDark}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* ✅ Mobile drawer sidebar */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
            />

            {/* drawer */}
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed left-0 top-0 z-50 h-screen w-80 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-[#070a16] md:hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
                <b className="text-gray-900 dark:text-white">Menu</b>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-950"
                >
                  <X size={18} className="dark:text-white" />
                </button>
              </div>

              <SidebarContent
                dark={dark}
                setDark={setDark}
                collapsed={false}
                setCollapsed={setCollapsed}
                closeDrawer={() => setDrawerOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
