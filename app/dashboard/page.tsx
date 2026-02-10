"use client";

import { SessionCard } from "@/components/session-card";
import { CalendarView } from "@/components/calendar-view";
import { getDashboardStats, getUpcomingSessions, mockSessions, mockStudent } from "@/lib/mock-data";
import { BookOpen, Calendar, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const stats = getDashboardStats();
    const upcomingSessions = getUpcomingSessions();
    const displayedSessions = upcomingSessions.slice(0, 4);

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
        {
            label: "Sessions This Week",
            value: stats.sessionsThisWeek,
            icon: Calendar,
        },
        {
            label: "Sessions This Month",
            value: stats.sessionsThisMonth,
            icon: BookOpen,
        },
        {
            label: "Hours Scheduled",
            value: `${stats.totalHoursScheduled}h`,
            icon: Clock,
        },
        {
            label: "Active Tutors",
            value: stats.activeTutors,
            icon: Users,
        },
    ];

    return (
        <>
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, {mockStudent.name.split(" ")[0]}!
                </h1>
                <p className="text-muted-foreground mt-1">
                    Here&apos;s your learning overview for today.
                </p>
            </div>

            {/* Row 1: Calendar + Compact Stats */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Calendar — only as wide as it needs */}
                <div className="shrink-0">
                    <CalendarView sessions={mockSessions} onDateSelect={handleDateSelect} />
                </div>

                {/* Compact Stats — fills remaining space */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {statItems.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="flex items-center gap-3 rounded-lg border bg-card p-4"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground truncate">
                                        {stat.label}
                                    </p>
                                    <p className="text-lg font-semibold leading-tight">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Row 2: Upcoming Sessions */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Your next scheduled sessions
                        </p>
                    </div>
                    {upcomingSessions.length > 0 && (
                        <Link
                            href="/dashboard/sessions"
                            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                            View All Sessions
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>

                {displayedSessions.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
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
                    <div className="text-center py-12 text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No upcoming sessions</p>
                        <p className="text-sm mt-2">Schedule a session to get started</p>
                    </div>
                )}

                {upcomingSessions.length > 4 && (
                    <div className="flex justify-center pt-2">
                        <Link
                            href="/dashboard/sessions"
                            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                            View {upcomingSessions.length - 4} more sessions
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
