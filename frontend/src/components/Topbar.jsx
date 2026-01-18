import { Menu } from "lucide-react";

export default function Topbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 px-4 py-4 backdrop-blur-xl dark:border-gray-800 dark:bg-[#070a16]/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* ✅ MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => {
              console.log("✅ Hamburger clicked");
              if (typeof onMenuClick === "function") onMenuClick();
            }}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-800 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-white md:hidden"
          >
            <Menu size={20} />
          </button>

          <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>

        <span className="hidden md:inline-flex ui-badge-neutral">
          Cyber Tools Platform
        </span>
      </div>
    </header>
  );
}
