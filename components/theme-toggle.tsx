"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = () => {
        setIsAnimating(true);
        const newTheme = resolvedTheme === "light" ? "dark" : "light";

        // Capture current background from body for overlay
        const bodyBg = getComputedStyle(document.body).backgroundColor;

        // Create full-screen overlay matching current bg
        const overlay = document.createElement("div");
        overlay.className = "theme-transition-overlay";
        overlay.style.backgroundColor = bodyBg;
        overlay.style.opacity = "1";
        document.body.appendChild(overlay);

        // Small delay to ensure overlay is painted, then switch theme
        requestAnimationFrame(() => {
            setTheme(newTheme);

            // After theme class has changed, fade out overlay
            requestAnimationFrame(() => {
                overlay.style.opacity = "0";
                const cleanup = () => {
                    overlay.remove();
                    setIsAnimating(false);
                };
                overlay.addEventListener("transitionend", cleanup, { once: true });
                // Safety fallback in case transitionend doesn't fire
                setTimeout(cleanup, 800);
            });
        });
    };

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled>
                <Sun className="h-4 w-4" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 relative overflow-hidden"
            onClick={handleToggle}
        >
            <Sun
                className={`h-4 w-4 absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark
                        ? "-rotate-90 scale-0 opacity-0"
                        : `rotate-0 scale-100 opacity-100 ${isAnimating ? "animate-[spin-gentle_0.5s_ease]" : ""}`
                    }`}
            />
            <Moon
                className={`h-4 w-4 absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDark
                        ? `rotate-0 scale-100 opacity-100 ${isAnimating ? "animate-[wiggle_0.5s_ease]" : ""}`
                        : "rotate-90 scale-0 opacity-0"
                    }`}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
