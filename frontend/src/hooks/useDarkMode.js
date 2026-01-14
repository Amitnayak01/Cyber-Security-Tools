import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  return { dark, setDark };
}
