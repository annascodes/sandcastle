// hooks/use-current-user.ts

"use client"

import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"

type CurrentUser = {
    id: number
    name: string | null
    email: string
}

type MeResponse = {
    user: CurrentUser | null
}

async function getCurrentUser() {
    return api<MeResponse>("/api/me")
}

export function useCurrentUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
    })
}