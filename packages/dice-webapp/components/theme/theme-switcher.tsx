"use client";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const selectTheme = (active: boolean) => {
    if (active) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Switch
      color="warning"
      checked={theme === "dark"}
      onCheckedChange={(active) => {
        selectTheme(active);
      }}
    />
  );
}
