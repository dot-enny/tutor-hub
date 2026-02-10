"use client";

import { SessionCard } from "@/components/session-card";
import { CalendarView } from "@/components/calendar-view";
import { getDashboardStats, getUpcomingSessions, mockSessions, mockStudent } from "@/lib/mock-data";
import { BookOpen, Calendar, Clock, Users, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

// Mini bar chart component for attendance/weekly data
function MiniBarChart({ data, color = "bg-primary" }: { data: number[]; color?: string }) {
    const max = Math.max(...data, 1);
    return (
        <div className="flex items-end gap-[3px] h-8">
            {data.map((val, i) => (
                <div
                    key={i}
                    className={`w-[5px] rounded-sm ${color} transition-all`}
                    style={{
                        height: `${Math.max((val / max) * 100, 8)}%`,
                        opacity: i === data.length - 1 ? 1 : 0.4 + (i / data.length) * 0.4,
                    }}
                />
            ))}
        </div>
    );
}

// Mini sparkline-like progress ring
function MiniRing({ value, max, label }: { value: number; max: number; label: string }) {
    const pct = Math.min((value / max) * 100, 100);
    const circumference = 2 * Math.PI * 16;
    const offset = circumference - (pct / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
                <circle
                    cx="20" cy="20" r="16"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-muted/60"
                />
                <circle
                    cx="20" cy="20" r="16"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    className="text-primary transition-all duration-500"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <span className="absolute text-[10px] font-bold">{Math.round(pct)}%</span>
        </div>
    );
}

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

    // Mock weekly session data (last 8 weeks)
    const weeklySessionData = [2, 3, 1, 4, 3, 5, 2, stats.sessionsThisWeek];
    // Mock monthly hours data (last 6 months)
    const monthlyHoursData = [8, 12, 6, 14, 10, stats.totalHoursScheduled];
    // Mock attendance rate
    const attendedSessions = mockSessions.filter((s) => s.status === "completed").length;
    const totalNonCancelled = mockSessions.filter((s) => s.status !== "cancelled").length;

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

            {/* Row 1: Calendar + Stats with Charts */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="shrink-0">
                    <CalendarView sessions={mockSessions} onDateSelect={handleDateSelect} />
                </div>

                {/* Enhanced stats grid */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                    {/* Sessions This Week */}
                    <div className="rounded-md border bg-background/60 p-3 flex flex-col justify-between gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">This Week</p>
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <p className="text-2xl font-bold leading-none">{stats.sessionsThisWeek}</p>
                                <p className="text-[10px] text-muted-foreground mt-1">sessions</p>
                            </div>
                            <MiniBarChart data={weeklySessionData} color="bg-primary" />
                        </div>
                    </div>

                    {/* Sessions This Month */}
                    <div className="rounded-md border bg-background/60 p-3 flex flex-col justify-between gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">This Month</p>
                            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <p className="text-2xl font-bold leading-none">{stats.sessionsThisMonth}</p>
                                <p className="text-[10px] text-muted-foreground mt-1">sessions</p>
                            </div>
                            <MiniBarChart data={monthlyHoursData} color="bg-chart-2" />
                        </div>
                    </div>

                    {/* Total Hours */}
                    <div className="rounded-md border bg-background/60 p-3 flex flex-col justify-between gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Hours</p>
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <p className="text-2xl font-bold leading-none">{stats.totalHoursScheduled}h</p>
                                <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-0.5">
                                    <TrendingUp className="h-2.5 w-2.5 text-green-500" />
                                    scheduled
                                </p>
                            </div>
                            <MiniBarChart data={[4, 6, 3, 8, 5, 7, 4, stats.totalHoursScheduled]} color="bg-chart-3" />
                        </div>
                    </div>

                    {/* Attendance Rate */}
                    <div className="rounded-md border bg-background/60 p-3 flex flex-col justify-between gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Attendance</p>
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <p className="text-2xl font-bold leading-none">
                                    {attendedSessions}/{totalNonCancelled}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    {stats.activeTutors} tutors
                                </p>
                            </div>
                            <MiniRing value={attendedSessions} max={totalNonCancelled} label="attendance" />
                        </div>
                    </div>
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
