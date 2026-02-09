import { User, Session, DashboardStats } from "./types";
import { addDays, addHours, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

// Mock Tutors
export const mockTutors: User[] = [
    {
        id: "tutor-1",
        name: "Dr. Sarah Chen",
        email: "sarah.chen@tutors.com",
        role: "tutor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
        id: "tutor-2",
        name: "Prof. James Wilson",
        email: "james.wilson@tutors.com",
        role: "tutor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    {
        id: "tutor-3",
        name: "Ms. Emily Rodriguez",
        email: "emily.rodriguez@tutors.com",
        role: "tutor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    {
        id: "tutor-4",
        name: "Mr. David Park",
        email: "david.park@tutors.com",
        role: "tutor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
];

// Mock Student (current user)
export const mockStudent: User = {
    id: "student-1",
    name: "Alex Johnson",
    email: "alex.johnson@student.com",
    role: "student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
};

// Helper to create sessions
const createSession = (
    id: string,
    title: string,
    subject: string,
    tutor: User,
    startTime: Date,
    durationMinutes: number,
    status: Session["status"],
    platform: Session["platform"] = "zoom",
    description?: string
): Session => {
    return {
        id,
        title,
        subject,
        description,
        tutor,
        student: mockStudent,
        startTime,
        endTime: addHours(startTime, durationMinutes / 60),
        duration: durationMinutes,
        status,
        platform,
        meetingLink: platform === "zoom"
            ? "https://zoom.us/j/123456789"
            : platform === "google-meet"
                ? "https://meet.google.com/abc-defg-hij"
                : undefined,
    };
};

// Generate mock sessions
const now = new Date();

export const mockSessions: Session[] = [
    // Upcoming sessions
    createSession(
        "session-1",
        "Calculus II - Derivatives",
        "Mathematics",
        mockTutors[0],
        addDays(now, 1),
        60,
        "scheduled",
        "zoom",
        "Covering chain rule and implicit differentiation"
    ),
    createSession(
        "session-2",
        "Physics - Quantum Mechanics Intro",
        "Physics",
        mockTutors[1],
        addDays(now, 2),
        90,
        "scheduled",
        "google-meet",
        "Introduction to wave functions and Schrödinger equation"
    ),
    createSession(
        "session-3",
        "English Literature - Shakespeare",
        "English",
        mockTutors[2],
        addDays(now, 3),
        60,
        "scheduled",
        "zoom",
        "Analysis of Macbeth Act 3"
    ),
    createSession(
        "session-4",
        "Computer Science - Data Structures",
        "Computer Science",
        mockTutors[3],
        addDays(now, 4),
        120,
        "scheduled",
        "zoom",
        "Binary trees and graph algorithms"
    ),
    createSession(
        "session-5",
        "Chemistry - Organic Chemistry",
        "Chemistry",
        mockTutors[0],
        addDays(now, 7),
        60,
        "scheduled",
        "google-meet",
        "Functional groups and nomenclature"
    ),

    // Past completed sessions
    createSession(
        "session-6",
        "Calculus II - Integration",
        "Mathematics",
        mockTutors[0],
        subDays(now, 2),
        60,
        "completed",
        "zoom",
        "U-substitution and integration by parts"
    ),
    createSession(
        "session-7",
        "Physics - Thermodynamics",
        "Physics",
        mockTutors[1],
        subDays(now, 5),
        90,
        "completed",
        "google-meet"
    ),
    createSession(
        "session-8",
        "Computer Science - Algorithms",
        "Computer Science",
        mockTutors[3],
        subDays(now, 7),
        120,
        "completed",
        "zoom"
    ),

    // Cancelled session
    createSession(
        "session-9",
        "English - Essay Review",
        "English",
        mockTutors[2],
        subDays(now, 1),
        60,
        "cancelled",
        "zoom",
        "Cancelled due to tutor illness"
    ),

    // Session happening now (for demo)
    createSession(
        "session-10",
        "Statistics - Hypothesis Testing",
        "Mathematics",
        mockTutors[0],
        addHours(now, -0.25), // Started 15 minutes ago
        60,
        "in-progress",
        "zoom",
        "T-tests and p-values"
    ),
];

// Helper functions for dashboard stats
export const getDashboardStats = (): DashboardStats => {
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const sessionsThisWeek = mockSessions.filter(
        (s) => s.startTime >= weekStart && s.startTime <= weekEnd && s.status !== "cancelled"
    ).length;

    const sessionsThisMonth = mockSessions.filter(
        (s) => s.startTime >= monthStart && s.startTime <= monthEnd && s.status !== "cancelled"
    ).length;

    const totalHours = mockSessions
        .filter((s) => s.status === "scheduled" || s.status === "in-progress")
        .reduce((acc, s) => acc + s.duration / 60, 0);

    const uniqueTutors = new Set(mockSessions.map((s) => s.tutor.id));

    return {
        sessionsThisWeek,
        sessionsThisMonth,
        totalHoursScheduled: Math.round(totalHours * 10) / 10,
        activeTutors: uniqueTutors.size,
    };
};

// Get upcoming sessions (next 5)
export const getUpcomingSessions = (): Session[] => {
    return mockSessions
        .filter((s) => s.startTime > now && s.status === "scheduled")
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .slice(0, 5);
};

// Get sessions by status
export const getSessionsByStatus = (status: Session["status"]): Session[] => {
    return mockSessions
        .filter((s) => s.status === status)
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
};

// Get sessions for a specific date
export const getSessionsForDate = (date: Date): Session[] => {
    return mockSessions.filter((s) => {
        const sessionDate = new Date(s.startTime);
        return (
            sessionDate.getDate() === date.getDate() &&
            sessionDate.getMonth() === date.getMonth() &&
            sessionDate.getFullYear() === date.getFullYear()
        );
    });
};
