"use client";

import { MonthCalendar } from "@/components/month-calendar";
import { mockSessions } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SessionsPage() {
    return (
        <div className="flex flex-col h-full">
            {/* Minimal header */}
            <div className="flex items-center gap-3 shrink-0 pb-3">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                </Link>
                <h1 className="text-lg font-semibold">My Sessions</h1>
            </div>

            {/* Full calendar grid fills the rest */}
            <div className="flex-1 min-h-0">
                <MonthCalendar sessions={mockSessions} />
            </div>
        </div>
    );
}
