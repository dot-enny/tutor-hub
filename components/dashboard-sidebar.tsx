"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Home,
    Calendar,
    BookOpen,
    Settings,
    User,
    Check,
    ChevronsLeft,
    LogOut,
    CreditCard,
    Bell,
} from "lucide-react";
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
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home, disabled: false },
    { name: "My Sessions", href: "/dashboard/sessions", icon: Calendar, disabled: false },
    { name: "Tutors", href: "/dashboard/tutors", icon: User, disabled: true },
    { name: "Resources", href: "/dashboard/resources", icon: BookOpen, disabled: true },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, disabled: true },
];

function AnimatedEllipsis() {
    return (
        <span className="inline-flex w-[1.5em]">
            <span className="animate-[ellipsis_1.4s_infinite] opacity-0">.</span>
            <span className="animate-[ellipsis_1.4s_0.2s_infinite] opacity-0">.</span>
            <span className="animate-[ellipsis_1.4s_0.4s_infinite] opacity-0">.</span>
        </span>
    );
}

function AnimatedCheck({ visible }: { visible: boolean }) {
    return (
        <span
            className={`inline-flex items-center transition-all duration-300 ${visible
                ? "opacity-100 scale-100 w-5"
                : "opacity-0 scale-0 w-0"
                }`}
        >
            <Check className="h-3.5 w-3.5 text-green-500" />
        </span>
    );
}

function SidebarCollapseToggle() {
    const { toggleSidebar, state } = useSidebar();
    return (
        <SidebarMenuButton
            onClick={toggleSidebar}
            tooltip={state === "expanded" ? "Collapse" : "Expand"}
            className="text-muted-foreground hover:text-foreground"
        >
            <ChevronsLeft
                className={`transition-transform duration-200 ${state === "collapsed" ? "rotate-180" : ""}`}
            />
            <span>Collapse</span>
        </SidebarMenuButton>
    );
}

export function DashboardSidebar() {
    const pathname = usePathname();
    const [zoomLoading, setZoomLoading] = useState(false);
    const [zoomConnected, setZoomConnected] = useState(false);
    const [zoomShowCheck, setZoomShowCheck] = useState(false);
    const [meetLoading, setMeetLoading] = useState(false);
    const [meetConnected, setMeetConnected] = useState(false);
    const [meetShowCheck, setMeetShowCheck] = useState(false);

    const handleZoomSync = async () => {
        if (zoomConnected) {
            setZoomShowCheck(false);
            setTimeout(() => setZoomConnected(false), 300);
            return;
        }
        setZoomLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setZoomConnected(true);
        setZoomLoading(false);
        setZoomShowCheck(true);
    };

    const handleMeetSync = async () => {
        if (meetConnected) {
            setMeetShowCheck(false);
            setTimeout(() => setMeetConnected(false), 300);
            return;
        }
        setMeetLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setMeetConnected(true);
        setMeetLoading(false);
        setMeetShowCheck(true);
    };

    useEffect(() => {
        if (zoomConnected) setZoomShowCheck(true);
    }, [zoomConnected]);

    useEffect(() => {
        if (meetConnected) setMeetShowCheck(true);
    }, [meetConnected]);

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <div className="flex items-center gap-2 overflow-hidden px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                    <div className="flex-1 min-w-0 overflow-hidden group-data-[collapsible=icon]:hidden">
                        <h1 className="text-lg font-bold truncate">TutorHub</h1>
                        <p className="text-xs text-muted-foreground truncate">Student Portal</p>
                    </div>
                    <div className="shrink-0 group-data-[collapsible=icon]:hidden">
                        <ThemeToggle />
                    </div>
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
                                        {item.disabled ? (
                                            <SidebarMenuButton
                                                isActive={false}
                                                tooltip={`${item.name} (coming soon)`}
                                                className="opacity-50 pointer-events-none"
                                            >
                                                <Icon />
                                                <span>{item.name}</span>
                                            </SidebarMenuButton>
                                        ) : (
                                            <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                                                <Link href={item.href}>
                                                    <Icon />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        )}
                                    </SidebarMenuItem>
                                );
                            })}
                            <SidebarMenuItem>
                                <SidebarCollapseToggle />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                {/* Sync buttons — link style, hidden when collapsed */}
                <div className="space-y-0.5 px-2 group-data-[collapsible=icon]:hidden">
                    <button
                        onClick={handleZoomSync}
                        disabled={zoomLoading}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 w-full text-left py-1"
                    >
                        <AnimatedCheck visible={zoomShowCheck} />
                        {zoomLoading ? (
                            <span>Syncing<AnimatedEllipsis /></span>
                        ) : zoomConnected ? (
                            <span>Zoom Connected</span>
                        ) : (
                            <span className="hover:underline">Sync Zoom Calendar</span>
                        )}
                    </button>
                    <button
                        onClick={handleMeetSync}
                        disabled={meetLoading}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 w-full text-left py-1"
                    >
                        <AnimatedCheck visible={meetShowCheck} />
                        {meetLoading ? (
                            <span>Syncing<AnimatedEllipsis /></span>
                        ) : meetConnected ? (
                            <span>Google Connected</span>
                        ) : (
                            <span className="hover:underline">Sync Google Calendar</span>
                        )}
                    </button>
                </div>

                <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />

                {/* Mini profile — hidden when collapsed */}
                <div className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="h-auto py-2">
                                        <Avatar className="h-7 w-7 shrink-0">
                                            <AvatarImage src="" alt="Alex Johnson" />
                                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                                AJ
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start text-left leading-tight">
                                            <span className="text-xs font-medium">Alex Johnson</span>
                                            <span className="text-[10px] text-muted-foreground">alex@example.com</span>
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" side="top" className="w-56">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">Alex Johnson</p>
                                            <p className="text-xs text-muted-foreground">alex@example.com</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell className="mr-2 h-4 w-4" />
                                        Notifications
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
