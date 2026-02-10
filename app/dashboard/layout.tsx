"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <div className="overflow-y-auto h-full p-5 space-y-5">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
