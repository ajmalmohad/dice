"use client";
import {useTheme} from "next-themes"
import { Switch } from "@nextui-org/switch"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const selectTheme = (e) => {
    if(e){ setTheme("dark") }
    else{ setTheme("light") }
  }

  return (
    <div>
      <Switch 
        isSelected={ theme === "dark" } 
        onValueChange={(e)=>{selectTheme(e)}} 
      />
    </div>
  )
};