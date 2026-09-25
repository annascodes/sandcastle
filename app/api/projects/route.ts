import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth/session"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const projects = await prisma.project.findMany({
      where: {
        projectMembers: {
          some: {
            userId: user.id,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Get projects error:", error)

    return NextResponse.json(
      { message: "Something went wrong.." ,error},
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    const name = body.name?.trim()
    const description = body.description?.trim() || null

    if (!name) {
      return NextResponse.json(
        { message: "Project name is required." },
        { status: 400 }
      )
    }

    const project = await prisma.$transaction(async (tx) => {
      const newProject = await tx.project.create({
        data: {
          name,
          description,
          createdById: user.id,
        },
      })

      await tx.projectMember.create({
        data: {
          projectId: newProject.id,
          userId: user.id,
          role: "OWNER",
        },
      })

      return newProject
    })

    return NextResponse.json(
      {
        message: "Project created successfully.",
        project,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create project error:", error)

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    )
  }
}