"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SyncButton } from "@/components/sync-button";
import { Card } from "@/components/ui/card";
import { Home, Calendar, BookOpen, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: Home,
    },
    {
        name: "My Sessions",
        href: "/dashboard/sessions",
        icon: Calendar,
    },
    {
        name: "Tutors",
        href: "/dashboard/tutors",
        icon: User,
    },
    {
        name: "Resources",
        href: "/dashboard/resources",
        icon: BookOpen,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed left-0 top-0 h-screen w-64 border-r bg-background p-6 flex flex-col">
            {/* Logo/Brand */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">TutorHub</h1>
                <p className="text-sm text-muted-foreground">Student Portal</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Sync Section */}
            <div className="space-y-4 border-t pt-6">
                <div>
                    <h3 className="text-sm font-semibold mb-2">Calendar Sync</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                        Connect your calendar
                    </p>
                </div>
                <div className="space-y-2">
                    <SyncButton platform="zoom" />
                    <SyncButton platform="google-meet" />
                </div>
            </div>
        </div>
    );
}
