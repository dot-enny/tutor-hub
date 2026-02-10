"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home, Calendar, BookOpen, Settings, User, Video, MonitorPlay, Check, Loader2 } from "lucide-react";
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
    SidebarRail,
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
    const [zoomLoading, setZoomLoading] = useState(false);
    const [zoomConnected, setZoomConnected] = useState(false);
    const [meetLoading, setMeetLoading] = useState(false);
    const [meetConnected, setMeetConnected] = useState(false);

    const handleZoomSync = async () => {
        setZoomLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setZoomConnected(!zoomConnected);
        setZoomLoading(false);
    };

    const handleMeetSync = async () => {
        setMeetLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setMeetConnected(!meetConnected);
        setMeetLoading(false);
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                    <div className="group-data-[collapsible=icon]:hidden">
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
                                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
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

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleZoomSync}
                            disabled={zoomLoading}
                            tooltip="Sync Zoom Calendar"
                        >
                            {zoomLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : zoomConnected ? (
                                <Check />
                            ) : (
                                <Video />
                            )}
                            <span>
                                {zoomLoading
                                    ? "Connecting..."
                                    : zoomConnected
                                        ? "Zoom Connected"
                                        : "Sync Zoom Calendar"}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleMeetSync}
                            disabled={meetLoading}
                            tooltip="Sync Google Calendar"
                        >
                            {meetLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : meetConnected ? (
                                <Check />
                            ) : (
                                <MonitorPlay />
                            )}
                            <span>
                                {meetLoading
                                    ? "Connecting..."
                                    : meetConnected
                                        ? "Google Connected"
                                        : "Sync Google Calendar"}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
