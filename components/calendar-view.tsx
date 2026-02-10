"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Session } from "@/lib/types";
import { isSameDay } from "date-fns";

interface CalendarViewProps {
    sessions: Session[];
    onDateSelect?: (date: Date) => void;
}

export function CalendarView({ sessions, onDateSelect }: CalendarViewProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date>(new Date());

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date && onDateSelect) {
            onDateSelect(date);
        }
    };

    const datesWithSessions = sessions
        .filter(s => s.status === "scheduled" || s.status === "in-progress")
        .map(s => s.startTime);

    return (
        <div className="rounded-md border bg-background/60 p-1 w-full">
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
                    hasSession: "relative after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full after:ring-2 after:ring-background",
                }}
                className="rounded-md w-full"
            />
        </div>
    );
}
