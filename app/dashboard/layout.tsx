import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth/session"
import DashSidebar from "@/components/dashboard/dashSidebar"
import { MobileSidebar } from "@/components/dashboard/mobileSidebar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="flex flex-row relative">
            <div className="w-2/12 border-r hidden md:block dark:border-stone-800 p"> <DashSidebar />  </div>
            <div className="md:hidden flex fixed top-14 left-2 ">
                <MobileSidebar />
            </div>
            <div className="w-10/12 md:border-l border-0 dark:border-stone-800"> {children}  </div>


        </div>
    )
}