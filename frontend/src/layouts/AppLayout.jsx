import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import useDarkMode from "../hooks/useDarkMode";

export default function AppLayout({ children }) {
  const { dark, setDark } = useDarkMode();

  const [toast, setToast] = useState({ message: "", type: "info" });
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // ✅ MUST EXIST

  function showToast(message, type = "info") {
    setToast({ message, type });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#05070f]">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1400px]">

        {/* ✅ MUST PASS drawerOpen + setDrawerOpen */}
        <Sidebar
          dark={dark}
          setDark={setDark}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />

        <main className="flex w-full flex-col">
          {/* ✅ MUST PASS setDrawerOpen inside layout object */}
          {typeof children === "function"
            ? children(showToast, {
                drawerOpen,
                setDrawerOpen,
                collapsed,
                setCollapsed
              })
            : children}
        </main>
      </div>
    </div>
  );
}
