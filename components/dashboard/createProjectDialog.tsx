"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type CreateProjectResponse = {
  message: string
  project: {
    id: string
    name: string
    description: string | null
  }
}

type CreateProjectData = {
  name: string
  description: string
}

async function createProject(data: CreateProjectData) {
  return api<CreateProjectResponse>("/api/projects", {
    method: "POST",
    body: data,
  })
}

export function CreateProjectDialog() {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const createProjectMutation = useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })

      setName("")
      setDescription("")
      setOpen(false)
    },
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) return

    createProjectMutation.mutate({
      name: name.trim(),
      description: description.trim(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="icon-xs"
            variant="outline"
            className={`cursor-pointer`}
            aria-label="Create project"
          />
        }
      >
        +
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">
              Name
            </Label>

            <Input
              id="project-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Website Redesign"
              disabled={createProjectMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">
              Description
            </Label>

            <Textarea
              id="project-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What is this project about?"
              disabled={createProjectMutation.isPending}
            />
          </div>

          {createProjectMutation.isError && (
            <p className="text-sm text-destructive">
              {createProjectMutation.error.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={
              !name.trim() || createProjectMutation.isPending
            }
          >
            {createProjectMutation.isPending
              ? "Creating..."
              : "Create project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}