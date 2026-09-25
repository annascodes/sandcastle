"use client"

import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"

export type Project = {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  createdById: number
}

type ProjectsResponse = {
  projects: Project[]
}

async function getProjects() {
  return api<ProjectsResponse>("/api/projects")
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })
}