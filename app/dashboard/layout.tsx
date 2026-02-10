"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                {/* Mobile header with trigger */}
                <div className="flex items-center gap-2 p-3 md:hidden border-b shrink-0">
                    <SidebarTrigger />
                    <span className="text-sm font-semibold">TutorHub</span>
                </div>
                <div className="overflow-y-auto flex-1 p-4 md:p-5 space-y-4 md:space-y-5">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
