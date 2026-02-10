"use client";

import { SessionCard } from "@/components/session-card";
import { CalendarView } from "@/components/calendar-view";
import { mockSessions } from "@/lib/mock-data";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SessionsPage() {
    const upcoming = mockSessions
        .filter((s) => s.status === "scheduled")
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    const inProgress = mockSessions.filter((s) => s.status === "in-progress");

    const completed = mockSessions
        .filter((s) => s.status === "completed")
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

    const cancelled = mockSessions
        .filter((s) => s.status === "cancelled")
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

    const handleJoinSession = (sessionId: string) => {
        console.log("Joining session:", sessionId);
    };

    const handleEditSession = (sessionId: string) => {
        console.log("Editing session:", sessionId);
    };

    const handleCancelSession = (sessionId: string) => {
        console.log("Cancelling session:", sessionId);
    };

    const handleDateSelect = (date: Date) => {
        console.log("Selected date:", date);
    };

    const renderSessionGroup = (
        title: string,
        sessions: typeof mockSessions
    ) => {
        if (sessions.length === 0) return null;
        return (
            <div className="space-y-3">
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sessions.map((session) => (
                        <SessionCard
                            key={session.id}
                            session={session}
                            onJoin={() => handleJoinSession(session.id)}
                            onEdit={() => handleEditSession(session.id)}
                            onCancel={() => handleCancelSession(session.id)}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Sessions</h1>
                    <p className="text-muted-foreground mt-1">
                        View and manage all your tutoring sessions.
                    </p>
                </div>
            </div>

            {/* Full-width Calendar */}
            <CalendarView sessions={mockSessions} onDateSelect={handleDateSelect} />

            {/* All Sessions by Status */}
            <div className="space-y-8">
                {renderSessionGroup("In Progress", inProgress)}
                {renderSessionGroup("Upcoming", upcoming)}
                {renderSessionGroup("Completed", completed)}
                {renderSessionGroup("Cancelled", cancelled)}

                {mockSessions.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No sessions yet</p>
                        <p className="text-sm mt-2">Schedule a session to get started</p>
                    </div>
                )}
            </div>
        </>
    );
}
