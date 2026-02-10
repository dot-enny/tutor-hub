"use client";

import { SessionCard } from "@/components/session-card";
import { StatsCard } from "@/components/stats-card";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { CalendarView } from "@/components/calendar-view";
import { getDashboardStats, getUpcomingSessions, mockSessions, mockStudent } from "@/lib/mock-data";
import { BookOpen, Calendar, Clock, Users } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardPage() {
    const stats = getDashboardStats();
    const upcomingSessions = getUpcomingSessions();

    const handleJoinSession = (sessionId: string) => {
        console.log("Joining session:", sessionId);
        // TODO: Open meeting link in new tab
    };

    const handleEditSession = (sessionId: string) => {
        console.log("Editing session:", sessionId);
        // TODO: Open edit dialog
    };

    const handleCancelSession = (sessionId: string) => {
        console.log("Cancelling session:", sessionId);
        // TODO: Show confirmation dialog
    };

    const handleDateSelect = (date: Date) => {
        console.log("Selected date:", date);
        // TODO: Filter sessions by date or navigate to sessions page
    };

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <div className="p-8 space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Welcome back, {mockStudent.name.split(" ")[0]}!
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Here&apos;s your learning overview for today.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatsCard
                            title="Sessions This Week"
                            value={stats.sessionsThisWeek}
                            icon={Calendar}
                            description="Scheduled tutoring sessions"
                        />
                        <StatsCard
                            title="Sessions This Month"
                            value={stats.sessionsThisMonth}
                            icon={BookOpen}
                            description="Total sessions scheduled"
                        />
                        <StatsCard
                            title="Hours Scheduled"
                            value={`${stats.totalHoursScheduled}h`}
                            icon={Clock}
                            description="Upcoming learning time"
                        />
                        <StatsCard
                            title="Active Tutors"
                            value={stats.activeTutors}
                            icon={Users}
                            description="Tutors you're working with"
                        />
                    </div>

                    {/* Main Content - Calendar and Upcoming Sessions */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Calendar - Takes up 2 columns on large screens */}
                        <div className="lg:col-span-2">
                            <CalendarView sessions={mockSessions} onDateSelect={handleDateSelect} />
                        </div>

                        {/* Upcoming Sessions */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your next {upcomingSessions.length} sessions
                                </p>
                            </div>
                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                {upcomingSessions.length > 0 ? (
                                    upcomingSessions.map((session) => (
                                        <SessionCard
                                            key={session.id}
                                            session={session}
                                            onJoin={() => handleJoinSession(session.id)}
                                            onEdit={() => handleEditSession(session.id)}
                                            onCancel={() => handleCancelSession(session.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No upcoming sessions</p>
                                        <p className="text-sm mt-2">Schedule a session to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
