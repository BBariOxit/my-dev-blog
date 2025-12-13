"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Laptop } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Chờ client mount để tránh lỗi hydration
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    const nextTheme = theme === "system" ? resolvedTheme : theme
    if (!nextTheme) return
    root.classList.remove("light", "dark")
    root.classList.add(nextTheme)
  }, [theme, resolvedTheme, mounted])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Loading theme">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  const icon =
    currentTheme === "dark" ? (
      <Moon className="h-5 w-5" />
    ) : currentTheme === "light" ? (
      <Sun className="h-5 w-5" />
    ) : (
      <Laptop className="h-5 w-5" />
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          data-state={currentTheme === "light" ? "checked" : "unchecked"}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          data-state={currentTheme === "dark" ? "checked" : "unchecked"}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          data-state={theme === "system" ? "checked" : "unchecked"}
        >
          <Laptop className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}