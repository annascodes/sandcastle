"use client"

import ContextSidebar from "./contextSidebar"
import DashSidebar from "./dashSidebar"
import MobileContextSidebar from "./mobileContextSidebar"
import { MobileSidebar } from "./mobileSidebar"
// import { MobileContextSidebar } from "./mobileContextSidebar"

export function DashboardShell({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            {/* Desktop global sidebar */}
            <aside className="hidden shrink-0 border-r md:block min-w-40">
                <DashSidebar />
            </aside>

            {/* Mobile global navigation */}
            <div className="fixed left-2 top-14 z-50 md:hidden">
                <MobileSidebar />
            </div>

            {/* Mobile context/project navigation */}
            <div className="fixed right-2 top-14 z-50 md:hidden">
                <MobileContextSidebar />
            </div>

            {/* Desktop context sidebar */}
            <aside className="hidden min-w-40 border md:block">
                <ContextSidebar />
            </aside>

            {/* Main workspace */}
            <main className="min-w-0 flex-1">
                {children}
            </main>
        </div>
    )
}