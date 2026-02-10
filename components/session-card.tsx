"use client";

import { Session } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTime, formatDate } from "@/lib/date-utils";
import { Calendar, Clock, Video, User, MonitorPlay, FileText } from "lucide-react";

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

const PlatformIcon = ({ platform }: { platform: Session["platform"] }) => {
    const className = "h-4 w-4";
    switch (platform) {
        case "zoom":
            return <Video className={className} />;
        case "google-meet":
            return <MonitorPlay className={className} />;
        case "none":
            return <FileText className={className} />;
        default:
            return null;
    }
};

export function SessionCard({ session, onJoin, onEdit, onCancel }: SessionCardProps) {
    const canJoin = session.status === "scheduled" || session.status === "in-progress";
    const isPast = session.status === "completed" || session.status === "cancelled";

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            {session.title}
                            {session.platform !== "none" && <PlatformIcon platform={session.platform} />}
                        </CardTitle>
                        <CardDescription className="mt-1">{session.subject}</CardDescription>
                    </div>
                    <Badge className={statusStyles[session.status]}>{session.status}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Tutor Info */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={session.tutor.avatar} alt={session.tutor.name} />
                        <AvatarFallback>
                            {session.tutor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.tutor.name}</p>
                    </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(session.startTime, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                            {formatTime(session.startTime)} ({session.duration} min)
                        </span>
                    </div>
                </div>

                {/* Description */}
                {session.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{session.description}</p>
                )}

                {/* Actions */}
                {!isPast && (
                    <div className="flex gap-2 pt-2">
                        {canJoin && session.meetingLink && (
                            <Button size="sm" className="flex-1" onClick={onJoin}>
                                <Video className="h-4 w-4 mr-2" />
                                Join
                            </Button>
                        )}
                        {session.status === "scheduled" && (
                            <>
                                <Button size="sm" variant="outline" onClick={onEdit}>
                                    Edit
                                </Button>
                                <Button size="sm" variant="outline" onClick={onCancel}>
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
