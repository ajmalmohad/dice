"use client";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/switch";
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
    <div>
      <Switch
        isSelected={theme === "dark"}
        onValueChange={(active) => {
          selectTheme(active);
        }}
        thumbIcon={() =>
          theme === "dark" ? (
            <div className="!text-black">
              <FaMoon />
            </div>
          ) : (
            <FaSun />
          )
        }
      />
    </div>
  );
}
