import { randomBytes } from "crypto"
import { cookies } from "next/headers"

import { prisma } from "@/lib/prisma"

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30 // 30 days

export async function createSession(userId: number) {
    const sessionId = randomBytes(32).toString("hex")

    const expiresAt = new Date(Date.now() + SESSION_DURATION)

    await prisma.session.create({
        data: {
            id: sessionId,
            userId,
            expiresAt,
        },
    })

    const cookieStore = await cookies()

    cookieStore.set("session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    })

    return sessionId
}

export async function getCurrentUser() {
    const cookieStore = await cookies()

    const sessionId = cookieStore.get("session")?.value

    if (!sessionId) {
        return null
    }

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
        include: {
            user: {
                select: {
                    id: true, name: true, email: true
                }
            },
        },
    })

    if (!session) {
        return null
    }

    if (session.expiresAt < new Date()) {
        await prisma.session.delete({
            where: {
                id: session.id,
            },
        })

        return null
    }

    return session.user
}

export async function deleteSession() {
    const cookieStore = await cookies()

    const sessionId = cookieStore.get("session")?.value

    if (sessionId) {
        await prisma.session.deleteMany({
            where: {
                id: sessionId,
            },
        })
    }

    cookieStore.delete("session")
}