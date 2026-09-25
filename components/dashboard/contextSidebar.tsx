'use client'

import { useProjects } from "@/hooks/use-projects"
import Link from "next/link"
import { Button } from "../ui/button"
import { CreateProjectDialog } from "./createProjectDialog"
import { ChevronRight, Folder } from "lucide-react"

const ContextSidebar = () => {
    const { data, isLoading, isError } = useProjects()
    if (isLoading) {
        return (
            <aside className="w-64 p-4">
                <p className="text-sm text-muted-foreground">
                    Loading projects...
                </p>
            </aside>
        )
    }
    if (isError) {
        return (
            <aside className="w-64 p-4">
                <p className="text-sm text-destructive">
                    Failed to load projects.
                </p>
            </aside>
        )
    }
    return (
        <aside className=" p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold">
                    Projects
                </h2>

                {/* <Button size="icon-xs" variant="outline">
                    +
                </Button> */}
                <CreateProjectDialog />
            </div>

            {data?.projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No projects yet.
                </p>
            ) : (
                <nav className="flex flex-col gap-1">
                    {data?.projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/dashboard/projects/${project.id}`}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                        >
                            <Folder className="h-4 w-4 shrink-0 opacity-50" />

                            <span className="min-w-0 flex-1 truncate">
                                {project.name}
                            </span>

                            <ChevronRight className="h-4 w-4 shrink-0 opacity-50 text-muted-foreground" />
                        </Link>
                    ))}
                </nav>
            )}
        </aside>
    )
}

export default ContextSidebar
