import Link from "next/link"
import {
  LayoutDashboard,
  FolderKanban,
  User,
  Settings,
} from "lucide-react"

import dashboard from "@/data/dashboard.json"
import { Button } from "@/components/ui/button"

const icons = {
  LayoutDashboard,
  FolderKanban,
  User,
  Settings,
}

const DashSidebar = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {dashboard.Dashboard.SidebarBtns.map((btn) => {
        const Icon = icons[btn.icon as keyof typeof icons]

        return (
          <Button
            key={btn.key}
            variant="ghost"
            className="w-full justify-start "
            
          >
            <Link href={btn.href} className="border-0 w-full font-normal text-sm border-stone-700 flex items-center justify-start flex-row">
              <Icon className="mr-2 h-4 w-4 opacity-50" />
              {btn.title}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

export default DashSidebar