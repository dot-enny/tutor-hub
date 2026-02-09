// Type definitions for the student dashboard

export type UserRole = "student" | "tutor";

export type SessionStatus = "scheduled" | "completed" | "cancelled" | "in-progress";

export type MeetingPlatform = "zoom" | "google-meet" | "none";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export interface Session {
    id: string;
    title: string;
    subject: string;
    description?: string;
    tutor: User;
    student: User;
    startTime: Date;
    endTime: Date;
    duration: number; // in minutes
    status: SessionStatus;
    platform: MeetingPlatform;
    meetingLink?: string;
    notes?: string;
}

export interface DashboardStats {
    sessionsThisWeek: number;
    sessionsThisMonth: number;
    totalHoursScheduled: number;
    activeTutors: number;
}
