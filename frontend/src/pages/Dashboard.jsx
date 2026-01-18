import { motion } from "framer-motion";
import {
  KeyRound,
  Hash,
  Lock,
  Globe,
  Radar,
  ShieldCheck,
  Users,
  Settings,
  History,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

import Topbar from "../components/Topbar";
import Page from "../components/Page";
import { useAuth } from "../context/AuthContext";

const tools = [
  {
    name: "Password Strength",
    icon: <KeyRound size={22} />,
    desc: "Validate password rules & generate suggestions.",
    link: "/password",
    color: "text-indigo-600 dark:text-indigo-300",
    bg: "bg-indigo-600/10 dark:bg-indigo-500/15"
  },
  {
    name: "Hash Generator",
    icon: <Hash size={22} />,
    desc: "Generate MD5/SHA hashes instantly.",
    link: "/hash",
    color: "text-cyan-700 dark:text-cyan-300",
    bg: "bg-cyan-600/10 dark:bg-cyan-500/15"
  },
  {
    name: "AES Encryption",
    icon: <Lock size={22} />,
    desc: "Encrypt & decrypt text using AES crypto.",
    link: "/crypto",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-600/10 dark:bg-emerald-500/15"
  },
  {
    name: "URL Scanner",
    icon: <Globe size={22} />,
    desc: "Detect suspicious patterns and basic URL risks.",
    link: "/url-scanner",
    color: "text-yellow-700 dark:text-yellow-300",
    bg: "bg-yellow-500/10 dark:bg-yellow-500/15",
    badge: "Analyst/Admin"
  },
  {
    name: "Port Scanner",
    icon: <Radar size={22} />,
    desc: "Scan common ports or custom ranges securely.",
    link: "/port-scanner",
    color: "text-pink-700 dark:text-pink-300",
    bg: "bg-pink-600/10 dark:bg-pink-500/15",
    badge: "Analyst/Admin"
  },
  {
    name: "VirusTotal Scan",
    icon: <ShieldCheck size={22} />,
    desc: "Scan URLs using VirusTotal API integrations.",
    link: "/virustotal",
    color: "text-purple-700 dark:text-purple-300",
    bg: "bg-purple-600/10 dark:bg-purple-500/15",
    badge: "Analyst/Admin"
  }
];

export default function Dashboard({ layout }) {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const canAccessAnalyst = role === "analyst" || role === "admin";
  const canAccessAdmin = role === "admin";

  return (
    <>
      <Topbar
  title="Dashboard"
  onMenuClick={() => {
    console.log("layout value:", layout);
    console.log("layout.setDrawerOpen:", layout?.setDrawerOpen);
    layout?.setDrawerOpen?.(true);
  }}
/>


      <Page>
        {/* ✅ Hero */}
        <div className="ui-card overflow-hidden">
          <div className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-6 text-white">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-white/20 blur-3xl" />
            </div>

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-wider opacity-90">
                Cyber Security Tools Platform
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Welcome {user ? user.username : "Guest"} 👋
              </h1>

              <p className="mt-2 max-w-2xl text-sm opacity-90">
                A professional security dashboard with role-based access control
                (RBAC), refresh tokens, and powerful scanning utilities.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="ui-badge border-white/20 bg-white/15 text-white">
                  Role: {role.toUpperCase()}
                </span>
                <span className="ui-badge border-white/20 bg-white/15 text-white">
                  Auth: Access + Refresh Tokens
                </span>
                <span className="ui-badge border-white/20 bg-white/15 text-white">
                  UI: Responsive + Animated
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Tool Cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              className="ui-card p-5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${t.bg} ${t.color}`}
                  >
                    {t.icon}
                  </div>

                  <div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white">
                      {t.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {t.desc}
                    </p>

                    {t.badge && (
                      <span className="ui-badge-warning mt-2 inline-flex">
                        {t.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  to={t.link}
                  className="ui-btn-dark w-full justify-center"
                >
                  Open Tool <ArrowRight size={18} />
                </Link>

                {!canAccessAnalyst && t.badge && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-300">
                    🔒 Locked: upgrade role to Analyst/Admin.
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ Quick Actions */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* History */}
          <div className="ui-card p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-black">
                <History size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white">
                  Activity History
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View and clear your tool usage logs.
                </p>
              </div>
            </div>

            <Link
              to="/history"
              className="ui-btn-primary mt-4 w-full justify-center"
            >
              Open History <ArrowRight size={18} />
            </Link>
          </div>

          {/* Admin Users */}
          <div className="ui-card p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-600/15 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white">
                  User Management
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create users, update roles, and manage access.
                </p>
              </div>
            </div>

            {canAccessAdmin ? (
              <Link
                to="/admin-users"
                className="ui-btn-primary mt-4 w-full justify-center"
              >
                Manage Users <ArrowRight size={18} />
              </Link>
            ) : (
              <div className="mt-4 ui-badge-danger inline-flex w-full justify-center">
                Admin Only 🔒
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="ui-card p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-600/10 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                <Settings size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white">
                  Platform Settings
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure API keys and platform settings securely.
                </p>
              </div>
            </div>

            {canAccessAdmin ? (
              <Link
                to="/settings"
                className="ui-btn-primary mt-4 w-full justify-center"
              >
                Open Settings <ArrowRight size={18} />
              </Link>
            ) : (
              <div className="mt-4 ui-badge-danger inline-flex w-full justify-center">
                Admin Only 🔒
              </div>
            )}
          </div>
        </div>
      </Page>
    </>
  );
}
