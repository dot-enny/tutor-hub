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
                <div className="p-6 space-y-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
