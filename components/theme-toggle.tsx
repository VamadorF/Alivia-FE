"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-lg"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5 opacity-60" />
      )}
    </Button>
  );
}
