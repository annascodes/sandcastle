import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import bcryptjs from "bcryptjs"

import { createSession } from "@/lib/auth/session"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const email = body.email?.trim().toLowerCase()
        const password = body.password

        if (!email || !password) {
            return NextResponse.json(
                {
                    message: "Email and password are required.",
                },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            return NextResponse.json(
                {
                    message: "Invalid email or password.",
                },
                { status: 401 }
            )
        }

        const passwordIsValid = bcryptjs.compareSync(password, user.password)

        if (!passwordIsValid) {
            return NextResponse.json(
                {
                    message: "Invalid email or password.",
                },
                { status: 401 }
            )
        }

        await createSession(user.id)

        return NextResponse.json({
            message: "Login successful.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        console.error("Login error:", error)

        return NextResponse.json(
            {
                message: "Something went wrong.",
            },
            { status: 500 }
        )
    }
}