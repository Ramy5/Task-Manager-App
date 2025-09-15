import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { loadTheme, saveTheme } from "../features/tasks/storage";

type ThemeName = "light" | "dark";

const Palette = {
  light: {
    bg: "#F9FAFB",
    card: "#FFFFFF",
    text: "#111111",
    subtext: "#4B5563",
    border: "#E5E7EB",
    accent: "#111827",
    muted: "#9CA3AF",
    success: "#10B981",
    danger: "#E11D48",
    link: "#2563EB",
  },
  dark: {
    bg: "#0B0F14",
    card: "#111827",
    text: "#F9FAFB",
    subtext: "#9CA3AF",
    border: "#1F2937",
    accent: "#93C5FD",
    muted: "#6B7280",
    success: "#10B981",
    danger: "#F87171",
    link: "#93C5FD",
  },
};

type ThemeValue = {
  name: ThemeName;
  colors: typeof Palette.light;
  isDark: boolean;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [name, setName] = useState<ThemeName>(
    system === "dark" ? "dark" : "light"
  );

  // hydrate stored theme
  useEffect(() => {
    (async () => {
      const saved = await loadTheme();
      if (saved) setName(saved);
    })();
  }, []);

  // persist on change
  useEffect(() => {
    saveTheme(name);
  }, [name]);

  const value = useMemo<ThemeValue>(
    () => ({
      name,
      colors: Palette[name],
      isDark: name === "dark",
      setTheme: setName,
      toggleTheme: () => setName((p) => (p === "dark" ? "light" : "dark")),
    }),
    [name]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
