import { useEffect, useState } from "react";
import "./ThemeToggle.css";

const STORAGE_KEY = "mochestra-theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

// 사용자가 고른 테마가 없으면 시스템 설정을 따름
function initialTheme() {
  const saved = document.documentElement.dataset.theme;
  if (saved === "light" || saved === "dark") return saved;
  return darkQuery.matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme);

  // 직접 고른 적 없으면 시스템 설정이 바뀔 때 따라감
  useEffect(() => {
    function onChange(e) {
      if (!document.documentElement.dataset.theme) setTheme(e.matches ? "dark" : "light");
    }
    darkQuery.addEventListener("change", onChange);
    return () => darkQuery.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 저장이 막혀 있어도 이번 화면에서는 전환됨
    }
    setTheme(next);
  }

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
      {isDark ? "라이트" : "다크"}
    </button>
  );
}
