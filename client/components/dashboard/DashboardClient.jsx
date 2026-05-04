// components/dashboard/DashboardClient.tsx — Client Component (socket + alert here)
"use client"

import { useGetUser } from "@/hooks/useUser"
import socket from "@/lib/socket"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { InfoIcon, MessageCircleWarning, X } from "lucide-react"
import { toast } from "sonner"
import { useGetEscalatedConvCount } from "@/hooks/useOrganization"
import { useConversationStore } from "@/stores/useConversationStore"

export default function DashboardClient() {
    const { data: user } = useGetUser()
    const [escalated, setEscalated] = useState(false)
    const {incCount} = useConversationStore()
    useGetEscalatedConvCount()

    useEffect(() => {
        if (!user) return

        socket.connect()
        socket.emit("join:org", user.organization_id)

        socket.on("new:escalation", () => {
            incCount()
            toast("User needs help", {
                description: "A user has raised a support ticket.",
                icon: <MessageCircleWarning className="h-4 w-4 text-amber-400" />,
                action: {
                    label: "View",
                    onClick: () => window.location.href = "/dashboard/conversations"
                },
                duration: 8000, // 8 second mein auto dismiss
            })
        })

        return () => {
            socket.off("new:escalation")
            socket.disconnect()
        }
    }, [user])

    if (!escalated) return null

    return (
        <>

        </>
    )
}