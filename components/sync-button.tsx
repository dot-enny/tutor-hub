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
        color: "bg-[#2D8CFF] hover:bg-[#2D8CFF]/90",
        icon: "🎥",
    },
    "google-meet": {
        name: "Google Meet",
        color: "bg-[#00897B] hover:bg-[#00897B]/90",
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
            className={`w-full ${isConnected ? "bg-green-600 hover:bg-green-700" : config.color} text-white`}
            variant={isConnected ? "default" : "default"}
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
