"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Session } from "@/lib/types";
import { isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
    sessions: Session[];
    onDateSelect?: (date: Date) => void;
}

export function CalendarView({ sessions, onDateSelect }: CalendarViewProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date>(new Date());

    const getSessionsForDate = (date: Date) => {
        return sessions.filter((session) => isSameDay(session.startTime, date));
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date && onDateSelect) {
            onDateSelect(date);
        }
    };

    // Modifier to add dots for dates with sessions
    const datesWithSessions = sessions
        .filter(s => s.status === "scheduled" || s.status === "in-progress")
        .map(s => s.startTime);

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    month={month}
                    onMonthChange={setMonth}
                    modifiers={{
                        hasSession: datesWithSessions,
                    }}
                    modifiersClassNames={{
                        hasSession: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
                    }}
                    className="rounded-md"
                />
            </CardContent>
        </Card>
    );
}
