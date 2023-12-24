"use client";
import {useTheme} from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@nextui-org/switch"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const selectTheme = (e) => {
    if(e){ setTheme("dark") }
    else{ setTheme("light") }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      <Switch isSelected={ theme === "dark" } onValueChange={(e)=>{selectTheme(e)}} />
    </div>
  )
};