"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/types";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
    sessions: Session[];
    onDateSelect?: (date: Date) => void;
}

export function CalendarView({ sessions, onDateSelect }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = monthStart.getDay();

    // Create array of empty slots for days before the month starts
    const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

    const getSessionsForDate = (date: Date) => {
        return sessions.filter((session) => isSameDay(session.startTime, date));
    };

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={previousMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={nextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before month starts */}
                    {emptyDays.map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                    ))}

                    {/* Days of the month */}
                    {daysInMonth.map((day) => {
                        const daysSessions = getSessionsForDate(day);
                        const hasScheduledSessions = daysSessions.some(s => s.status === "scheduled");
                        const isCurrentDay = isToday(day);

                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => onDateSelect?.(day)}
                                className={`
                                    aspect-square p-2 rounded-md text-sm relative
                                    hover:bg-accent hover:text-accent-foreground
                                    transition-colors
                                    ${isCurrentDay ? "bg-primary text-primary-foreground font-bold" : ""}
                                    ${!isSameMonth(day, currentMonth) ? "text-muted-foreground" : ""}
                                `}
                            >
                                <span className="block text-center">{format(day, "d")}</span>
                                {hasScheduledSessions && (
                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                                        {daysSessions.slice(0, 3).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1 w-1 rounded-full ${isCurrentDay ? "bg-primary-foreground" : "bg-primary"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
