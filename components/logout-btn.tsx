"use client"

import { useMutation } from "@tanstack/react-query"

import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"

async function logoutUser() {
    return api<{ message: string }>("/api/logout", {
        method: "POST",
    })
}

export function LogoutButton() {
    const logoutMutation = useMutation({
        mutationFn: logoutUser,

        onSuccess: () => {
            window.location.href = "/"
        },
    })

    return (
        <>
            <button
                // size="xs"
                // variant="destructive"
                className="dark:text-red-300 text-red-400"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
            >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </button>
            {/* <Button
      size="xs"
      variant="destructive"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </Button> */}
        </>
    )
}