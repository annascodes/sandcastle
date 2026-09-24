"use client"

import Link from "next/link"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

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
import { api } from "@/lib/api"

type RegisterResponse = {
    message: string
    user: {
        id: number
        name: string | null
        email: string
    }
}
type RegisterData = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

// async function registerUser(data: RegisterData) {
//     const response = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     })

//     const result = await response.json()

//     if (!response.ok) {
//         throw new Error(result.message || "Registration failed.")
//     }

//     return result
// }


async function registerUser(data: RegisterData) {
    return api<RegisterResponse>("/api/register", {
        method: "POST",
        body: data,
    })
}

export function RegisterForm() {
    const [formData, setFormData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "12345678",
        confirmPassword: "12345678",
    })

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            console.log("Registration successful")
            window.location.href = '/login'
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

        if (formData.password !== formData.confirmPassword) {
            return
        }

        registerMutation.mutate(formData)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-lg">Create an account</CardTitle>

                <CardDescription>
                    Enter your information below to create your account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                            Confirm password
                        </Label>

                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                            <p className="text-sm text-destructive">
                                Passwords do not match.
                            </p>
                        )}

                    {registerMutation.isError && (
                        <p className="text-sm text-destructive">
                            {registerMutation.error.message}
                        </p>
                    )}

                    {registerMutation.isSuccess && (
                        <p className="text-sm text-green-600">
                            Account created successfully.
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={registerMutation.isPending}
                    >
                        {registerMutation.isPending
                            ? "Creating account..."
                            : "Create account"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-foreground hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}