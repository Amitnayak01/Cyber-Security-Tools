import { ShieldAlert } from "lucide-react";
import Topbar from "../components/Topbar";
import Page from "../components/Page";
import { Link } from "react-router-dom";

export default function Forbidden({ layout }) {
  return (
    <>
      <Topbar
        title="Access Denied"
        onMenuClick={() => layout?.setDrawerOpen(true)}
      />

      <Page>
        <div className="ui-card p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow">
            <ShieldAlert />
          </div>

          <h2 className="mt-4 text-2xl font-black text-gray-900 dark:text-white">
            403 - Forbidden
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            You don’t have permission to access this page.
          </p>

          <Link to="/" className="ui-btn-primary mt-6 inline-flex">
            Back to Dashboard
          </Link>
        </div>
      </Page>
    </>
  );
}
