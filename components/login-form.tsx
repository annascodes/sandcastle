"use client"

import Link from "next/link"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginData = {
    email: string
    password: string
}

type LoginResponse = {
    message: string
    user: {
        id: number
        name: string | null
        email: string
    }
}

async function loginUser(data: LoginData) {
    return api<LoginResponse>("/api/login", {
        method: "POST",
        body: data,
    })
}

export function LoginForm() {
    const [formData, setFormData] = useState<LoginData>({
        email: "anas.brainyte@gmail.com",
        password: "12345678",
    })

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log("Logged in:", data.user)
            window.location.href = "/"
        },
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((current) => ({
            ...current,
            [name]: value,
        }))
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        loginMutation.mutate(formData)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">
                    Welcome back
                </CardTitle>

                <CardDescription>
                    Enter your email and password to sign in.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>

                            <Link
                                href="/forgot-password"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {loginMutation.isError && (
                        <p className="text-sm text-destructive">
                            {loginMutation.error.message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending
                            ? "Signing in..."
                            : "Sign in"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-foreground hover:underline"
                    >
                        Create an account
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}