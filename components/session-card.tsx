"use client";

import { Session } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTime, formatDate } from "@/lib/date-utils";
import { Calendar, Clock, Video } from "lucide-react";

interface SessionCardProps {
    session: Session;
    onJoin?: () => void;
    onEdit?: () => void;
    onCancel?: () => void;
}

const statusStyles = {
    scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "in-progress": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function SessionCard({ session, onJoin, onEdit, onCancel }: SessionCardProps) {
    const canJoin = session.status === "scheduled" || session.status === "in-progress";
    const isPast = session.status === "completed" || session.status === "cancelled";

    return (
        <div className="rounded-md border bg-background/60 p-3 hover:shadow-sm transition-shadow space-y-2">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{session.title}</p>
                    <p className="text-xs text-muted-foreground">{session.subject}</p>
                </div>
                <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 shrink-0 ${statusStyles[session.status]}`}>
                    {session.status}
                </Badge>
            </div>

            {/* Tutor */}
            <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                    <AvatarImage src={session.tutor.avatar} alt={session.tutor.name} />
                    <AvatarFallback className="text-[9px]">
                        {session.tutor.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground truncate">{session.tutor.name}</p>
            </div>

            {/* Details */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(session.startTime, "MMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(session.startTime)} · {session.duration}m
                </span>
            </div>

            {/* Actions */}
            {!isPast && (
                <div className="flex gap-1.5 pt-1">
                    {canJoin && session.meetingLink && (
                        <Button size="sm" className="h-7 text-xs flex-1" onClick={onJoin}>
                            <Video className="h-3 w-3 mr-1" />
                            Join
                        </Button>
                    )}
                    {session.status === "scheduled" && (
                        <>
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onEdit}>
                                Edit
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onCancel}>
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
