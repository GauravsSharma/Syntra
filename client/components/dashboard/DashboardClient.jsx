// components/dashboard/DashboardClient.tsx — Client Component (dashboardSocket + alert here)
"use client"

import { useGetMetaData, useGetUser } from "@/hooks/useUser"
import { useEffect, useState, useRef } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { InfoIcon, MessageCircleWarning, X } from "lucide-react"
import { toast } from "sonner"
import { useGetEscalatedConvCount } from "@/hooks/useOrganization"
import { useConversationStore } from "@/stores/useConversationStore"
import { useUserStore } from "@/stores/useUserStore";
import { dashboardSocket } from "@/lib/dashboardSocket";

export default function DashboardClient() {
    useGetMetaData()
    const { data: user } = useGetUser()
    const { metadata } = useUserStore()
    const [escalated, setEscalated] = useState(false)
    const { addSideBarConv } = useConversationStore()
    const { incCount } = useConversationStore()
    useGetEscalatedConvCount()
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio("/notification.mp3");
    }, []);

useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
    audioRef.current.preload = "auto";

    const unlockAudio = async () => {
        try {
            await audioRef.current.play();
            audioRef.current.pause();
            audioRef.current.currentTime = 0;

            console.log("audio unlocked");
        } catch (err) {
            console.log(err);
        }

        window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);

    return () => {
        window.removeEventListener("click", unlockAudio);
    };
}, []);

    useEffect(() => {
        if (!metadata) return;

        dashboardSocket.connect();

        dashboardSocket.off("connect");
        dashboardSocket.off("new:escalation");

        dashboardSocket.on("connect", () => {
            console.log(dashboardSocket.id);

            dashboardSocket.emit("join:org", metadata.id);
        });

        dashboardSocket.on("new:escalation", (data) => {
            console.log("new escalation");

            incCount();
            addSideBarConv(data);

            toast("User needs help", {
                description: "A user has raised a support ticket.",
                icon: (
                    <MessageCircleWarning className="h-4 w-4 text-amber-400" />
                ),
                action: {
                    label: "View",
                    onClick: () =>
                    (window.location.href =
                        "/dashboard/conversations"),
                },
                duration: 8000,
            });

            audioRef.current?.play().catch(() => { });
        });

        return () => {
            dashboardSocket.off("connect");
            dashboardSocket.off("new:escalation");
        };
    }, [metadata]);

    return (
        <>

        </>
    )
}