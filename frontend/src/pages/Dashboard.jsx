import ToolCard from "../components/ToolCard";
import Topbar from "../components/Topbar";

export default function Dashboard() {
  return (
    <>
      <Topbar title="Dashboard" />
      <div className="p-6 space-y-6">
        <ToolCard title="Welcome">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Final version Cyber Security Tools Platform with RBAC + Refresh Tokens.
          </p>
        </ToolCard>
      </div>
    </>
  );
}
