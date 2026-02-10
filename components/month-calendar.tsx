"use client";

import { useState, useMemo } from "react";
import { Session } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { formatTime } from "@/lib/date-utils";
import {
    ChevronLeft,
    ChevronRight,
    Video,
    MonitorPlay,
    Clock,
} from "lucide-react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    format,
    addMonths,
    subMonths,
} from "date-fns";

interface MonthCalendarProps {
    sessions: Session[];
}

const statusColors: Record<Session["status"], string> = {
    scheduled: "bg-blue-500",
    "in-progress": "bg-green-500",
    completed: "bg-gray-400",
    cancelled: "bg-red-400",
};

const statusBadgeStyles: Record<Session["status"], string> = {
    scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "in-progress": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function MonthCalendar({ sessions }: MonthCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const calendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const calStart = startOfWeek(monthStart);
        const calEnd = endOfWeek(monthEnd);
        return eachDayOfInterval({ start: calStart, end: calEnd });
    }, [currentMonth]);

    const getSessionsForDay = (day: Date) => {
        return sessions.filter((s) => isSameDay(s.startTime, day));
    };

    const selectedDaySessions = selectedDate
        ? getSessionsForDay(selectedDate)
        : [];

    const handleDayClick = (day: Date) => {
        setSelectedDate(day);
        setDialogOpen(true);
    };

    const handleJoin = (session: Session) => {
        if (session.meetingLink) {
            window.open(session.meetingLink, "_blank");
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Month navigation header */}
            <div className="flex items-center justify-between px-1 pb-3 shrink-0">
                <h3 className="text-sm font-medium text-muted-foreground">
                    {format(currentMonth, "MMMM yyyy")}
                </h3>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setCurrentMonth(new Date())}
                    >
                        Today
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b shrink-0">
                {WEEKDAYS.map((day) => (
                    <div
                        key={day}
                        className="py-2 text-center text-[11px] font-medium text-muted-foreground uppercase tracking-wider"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Days grid — fills remaining space */}
            <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                {calendarDays.map((day, i) => {
                    const daySessions = getSessionsForDay(day);
                    const inMonth = isSameMonth(day, currentMonth);
                    const today = isToday(day);

                    return (
                        <button
                            key={i}
                            onClick={() => handleDayClick(day)}
                            className={`
                                relative border-b border-r p-1.5 text-left transition-colors
                                hover:bg-accent/50 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-inset
                                ${!inMonth ? "text-muted-foreground/40 bg-muted/20" : ""}
                                ${i % 7 === 0 ? "border-l-0" : ""}
                            `}
                        >
                            <span
                                className={`
                                    inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium
                                    ${today ? "bg-primary text-primary-foreground" : ""}
                                `}
                            >
                                {format(day, "d")}
                            </span>
                            {/* Session indicators */}
                            {daySessions.length > 0 && (
                                <div className="mt-0.5 space-y-0.5">
                                    {daySessions.slice(0, 3).map((s) => (
                                        <div
                                            key={s.id}
                                            className={`
                                                h-1.5 rounded-full ${statusColors[s.status]}
                                                ${!inMonth ? "opacity-30" : "opacity-70"}
                                            `}
                                        />
                                    ))}
                                    {daySessions.length > 3 && (
                                        <p className="text-[9px] text-muted-foreground leading-none">
                                            +{daySessions.length - 3}
                                        </p>
                                    )}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Day detail dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedDaySessions.length === 0
                                ? "No sessions scheduled for this day."
                                : `${selectedDaySessions.length} session${selectedDaySessions.length > 1 ? "s" : ""}`}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedDaySessions.length > 0 && (
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {selectedDaySessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="rounded-md border p-3 space-y-2"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium truncate">
                                                {session.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {session.subject}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className={`text-[10px] px-1.5 py-0 shrink-0 ${statusBadgeStyles[session.status]}`}
                                        >
                                            {session.status}
                                        </Badge>
                                    </div>

                                    {/* Tutor */}
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage
                                                src={session.tutor.avatar}
                                                alt={session.tutor.name}
                                            />
                                            <AvatarFallback className="text-[9px]">
                                                {session.tutor.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {session.tutor.name}
                                        </p>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {formatTime(session.startTime)} · {session.duration}min
                                    </div>

                                    {/* Description */}
                                    {session.description && (
                                        <p className="text-xs text-muted-foreground">
                                            {session.description}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    {(session.status === "scheduled" ||
                                        session.status === "in-progress") && (
                                            <div className="flex gap-1.5 pt-1">
                                                {session.meetingLink && (
                                                    <Button
                                                        size="sm"
                                                        className="h-7 text-xs"
                                                        onClick={() => handleJoin(session)}
                                                    >
                                                        {session.platform === "zoom" ? (
                                                            <Video className="h-3 w-3 mr-1" />
                                                        ) : (
                                                            <MonitorPlay className="h-3 w-3 mr-1" />
                                                        )}
                                                        Join
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
