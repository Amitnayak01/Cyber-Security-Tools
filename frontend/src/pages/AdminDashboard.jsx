import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

import Topbar from "../components/Topbar";
import Page from "../components/Page";
import ToolCard from "../components/ToolCard";
import LoadingCards from "../components/LoadingCards";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

import { motion } from "framer-motion";
import { Users, FileText, ShieldCheck, RefreshCcw } from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function formatTool(tool) {
  // nice names
  const map = {
    PASSWORD: "Password Strength",
    HASH: "Hash Generator",
    CRYPTO: "AES Crypto",
    URLSCAN: "URL Scanner",
    PORTSCAN: "Port Scanner",
    WHOIS: "WHOIS Lookup",
    VIRUSTOTAL: "VirusTotal",
    PDF: "PDF Export"
  };
  return map[tool] || tool;
}

export default function AdminDashboard({ showToast }) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const res = await apiClient.get("/api/dashboard");
      setStats(res.data.result);
    } catch (e) {
      const msg = e?.response?.data?.message || "Failed to load dashboard";
      setError(msg);
      showToast?.(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const toolUsageData =
    stats?.toolUsage?.map((x) => ({
      tool: formatTool(x._id),
      count: x.count
    })) || [];

  const successStats =
    stats?.successStats?.reduce(
      (acc, cur) => {
        if (cur._id === true) acc.success = cur.count;
        if (cur._id === false) acc.failed = cur.count;
        return acc;
      },
      { success: 0, failed: 0 }
    ) || { success: 0, failed: 0 };

  const topTool = toolUsageData?.[0]?.tool || "N/A";

  return (
    <>
      <Topbar title="Admin Dashboard" />

      <Page>
        {/* Header Card */}
        <div className="ui-card overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-wider opacity-90">
              ADMIN PANEL
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-tight">
              Platform Analytics Dashboard
            </h1>
            <p className="mt-2 text-sm opacity-90">
              Monitor usage, logs, and tool activity across the platform.
            </p>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <>
            <LoadingCards count={3} />
            <ToolCard title="Loading Analytics...">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please wait while we fetch dashboard statistics.
              </p>
            </ToolCard>
          </>
        )}

        {/* Error */}
        {!loading && error && (
          <ToolCard title="Error">
            <p className="text-sm text-red-600">{error}</p>

            <button onClick={load} className="ui-btn-primary mt-4">
              <RefreshCcw size={18} />
              Retry
            </button>
          </ToolCard>
        )}

        {/* Content */}
        {!loading && stats && (
          <>
            {/* Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                subtitle="Registered accounts"
              />
              <StatCard
                title="Total Logs"
                value={stats.totalLogs}
                subtitle="History records stored"
              />
              <StatCard
                title="Most Used Tool"
                value={topTool}
                subtitle="Top tool by usage"
              />
              <StatCard
                title="Success Logs"
                value={successStats.success}
                subtitle={`Failed: ${successStats.failed}`}
              />
            </motion.div>

            {/* Analytics Cards */}
            <div className="grid gap-4 xl:grid-cols-3">
              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="ui-card p-5 xl:col-span-1"
              >
                <p className="text-sm font-black text-gray-900 dark:text-white">
                  System Summary
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                      <Users />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Users
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {stats.totalUsers}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-600/10 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                      <FileText />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Logs
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {stats.totalLogs}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-green-600/10 text-green-600 dark:bg-green-500/15 dark:text-green-300">
                      <ShieldCheck />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Success Rate
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {stats.totalLogs === 0
                          ? "0%"
                          : `${Math.round(
                              (successStats.success / stats.totalLogs) * 100
                            )}%`}
                      </p>
                    </div>
                  </div>

                  <button onClick={load} className="ui-btn-dark mt-4 w-full">
                    <RefreshCcw size={18} />
                    Refresh Stats
                  </button>
                </div>
              </motion.div>

              {/* Tool Usage Chart */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="xl:col-span-2"
              >
                <ChartCard title="Tool Usage Analytics">
                  {toolUsageData.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
                      No logs yet. Tool usage chart will appear after tools are
                      used.
                    </div>
                  ) : (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={toolUsageData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="tool"
                            tick={{ fontSize: 12 }}
                            interval={0}
                            angle={-15}
                            height={60}
                          />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" radius={[10, 10, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </ChartCard>
              </motion.div>
            </div>

            {/* Raw stats for debugging */}
            <ToolCard title="Raw API Data (Debug)">
              <pre className="overflow-x-auto rounded-2xl bg-gray-100 p-4 text-xs dark:bg-gray-900 dark:text-gray-200">
                {JSON.stringify(stats, null, 2)}
              </pre>
            </ToolCard>
          </>
        )}
      </Page>
    </>
  );
}
