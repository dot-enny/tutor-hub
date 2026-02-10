"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SyncButton } from "@/components/sync-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home, Calendar, BookOpen, Settings, User } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";

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
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-lg font-bold">TutorHub</h1>
                        <p className="text-xs text-muted-foreground">Student Portal</p>
                    </div>
                    <ThemeToggle />
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link href={item.href}>
                                                <Icon />
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupLabel>Calendar Sync</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="space-y-2 p-2">
                            <SyncButton platform="zoom" />
                            <SyncButton platform="google-meet" />
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    );
}
