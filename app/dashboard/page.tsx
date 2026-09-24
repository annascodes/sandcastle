// app/dashboard/page.tsx

import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth/session"

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <main className="p-6">
            {/* <h1 className="text-2xl font-semibold">
        Welcome, {user.name}
      </h1> */}

            <p className="text-muted-foreground">
                You are logged in.
            </p>
            {/* {
                [...Array(10)].map((_, i) => (
                    <div className="h-60 w-full border border-stone-600">

                    </div>
                ))
            } */}
        </main>
    )
}