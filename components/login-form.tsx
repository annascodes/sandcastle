"use client"

import Link from "next/link"

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

export function LoginForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
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
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
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