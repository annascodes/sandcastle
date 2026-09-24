"use client"

import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import DashSidebar from "./dashSidebar"



export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger >
                <Button variant={'outline'} size="icon-sm" className={`bg-black`}>
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-4">
                <DashSidebar />
            </SheetContent>
        </Sheet>
    )
}