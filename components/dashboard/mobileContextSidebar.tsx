'use client'

import { Menu, MenuIcon, SidebarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import DashSidebar from "./dashSidebar"

const MobileContextSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger >
                <Button variant={'outline'} size="icon-sm" className={`bg-black`}>
                    <SidebarIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 p-4">
                <DashSidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileContextSidebar
