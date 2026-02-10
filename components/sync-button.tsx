"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MeetingPlatform } from "@/lib/types";
import { Check, Loader2 } from "lucide-react";

interface SyncButtonProps {
    platform: Exclude<MeetingPlatform, "none">;
    onSync?: (platform: Exclude<MeetingPlatform, "none">) => void;
}

const platformConfig = {
    zoom: {
        name: "Zoom",
        variant: "default" as const,
        icon: "🎥",
    },
    "google-meet": {
        name: "Google Meet",
        variant: "secondary" as const,
        icon: "📹",
    },
};

export function SyncButton({ platform, onSync }: SyncButtonProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const config = platformConfig[platform];

    const handleSync = async () => {
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsConnected(!isConnected);
        setIsLoading(false);

        if (onSync) {
            onSync(platform);
        }
    };

    return (
        <Button
            onClick={handleSync}
            disabled={isLoading}
            variant={isConnected ? "outline" : config.variant}
            className="w-full"
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                </>
            ) : isConnected ? (
                <>
                    <Check className="mr-2 h-4 w-4" />
                    {config.name}
                </>
            ) : (
                <>
                    <span className="mr-2 text-base">{config.icon}</span>
                    {config.name}
                </>
            )}
        </Button>
    );
}
