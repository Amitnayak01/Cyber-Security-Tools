import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function AdminDashboard({ showToast }) {
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);

  async function load(){
    setLoading(true);
    try{const res=await apiClient.get("/api/dashboard");setData(res.data.result);}
    catch(e){showToast?.(e?.response?.data?.message||"Failed","error");}
    finally{setLoading(false);}
  }
  useEffect(()=>{load();},[]);
  const toolUsage=(data?.toolUsage||[]).map(x=>({tool:x._id,count:x.count}));
  return (
    <>
      <Topbar title="Admin Dashboard" />
      <div className="p-6 space-y-6">
        {loading && <Loader text="Loading..." />}
        {data && (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard title="Total Users" value={data.totalUsers}/>
              <StatCard title="Total Logs" value={data.totalLogs}/>
              <StatCard title="Top Tool" value={toolUsage[0]?.tool||"N/A"} subtitle={`${toolUsage[0]?.count||0} uses`}/>
            </div>
            <ChartCard title="Tool Usage">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={toolUsage}>
                    <XAxis dataKey="tool" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </>
        )}
      </div>
    </>
  );
}
