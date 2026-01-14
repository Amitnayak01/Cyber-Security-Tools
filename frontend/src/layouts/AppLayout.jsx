import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import useDarkMode from "../hooks/useDarkMode";

export default function AppLayout({ children }) {
  const { dark, setDark } = useDarkMode();
  const [toast, setToast] = useState({ message: "", type: "info" });
  function showToast(message, type = "info") { setToast({ message, type }); }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />
      <Sidebar dark={dark} setDark={setDark} />
      <main className="flex w-full flex-col">
        {typeof children === "function" ? children(showToast) : children}
      </main>
    </div>
  );
}
