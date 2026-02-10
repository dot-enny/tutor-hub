"use client";

import { SessionCard } from "@/components/session-card";
import { CalendarView } from "@/components/calendar-view";
import { getDashboardStats, getUpcomingSessions, mockSessions, mockStudent } from "@/lib/mock-data";
import { BookOpen, Calendar, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const stats = getDashboardStats();
    const upcomingSessions = getUpcomingSessions();
    const displayedSessions = upcomingSessions.slice(0, 6);

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

    const statItems = [
        { label: "This Week", value: stats.sessionsThisWeek, icon: Calendar },
        { label: "This Month", value: stats.sessionsThisMonth, icon: BookOpen },
        { label: "Hours", value: `${stats.totalHoursScheduled}h`, icon: Clock },
        { label: "Tutors", value: stats.activeTutors, icon: Users },
    ];

    return (
        <>
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Welcome back, {mockStudent.name.split(" ")[0]}!
                </h1>
                <p className="text-sm text-muted-foreground">
                    Here&apos;s your learning overview for today.
                </p>
            </div>

            {/* Row 1: Calendar + Compact Stats */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="shrink-0">
                    <CalendarView sessions={mockSessions} onDateSelect={handleDateSelect} />
                </div>

                <div className="flex-1 grid grid-cols-2 lg:grid-cols-1 gap-2">
                    {statItems.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="flex items-center gap-2.5 rounded-md border bg-background/60 px-3 py-2.5"
                            >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-muted">
                                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] text-muted-foreground leading-none">
                                        {stat.label}
                                    </p>
                                    <p className="text-sm font-semibold leading-tight mt-0.5">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Row 2: Upcoming Sessions */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
                    {upcomingSessions.length > 0 && (
                        <Link
                            href="/dashboard/sessions"
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            View All
                            <ArrowRight className="h-3 w-3" />
                        </Link>
                    )}
                </div>

                {displayedSessions.length > 0 ? (
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        {displayedSessions.map((session) => (
                            <SessionCard
                                key={session.id}
                                session={session}
                                onJoin={() => handleJoinSession(session.id)}
                                onEdit={() => handleEditSession(session.id)}
                                onCancel={() => handleCancelSession(session.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No upcoming sessions</p>
                    </div>
                )}

                {upcomingSessions.length > 6 && (
                    <div className="flex justify-center pt-1">
                        <Link
                            href="/dashboard/sessions"
                            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                            View {upcomingSessions.length - 6} more
                            <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
