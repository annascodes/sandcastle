This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 
npm install @prisma/client @prisma/adapter-pg pg dotenv
npm install -D prisma

npx prisma init

npm uninstall prisma @prisma/client @prisma/adapter-pg 

npm install @prisma/client@7 @prisma/adapter-pg@7 pg dotenv
npm install -D prisma@7

npx prisma -v


## config
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});

## initial prisma\schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
## 
npx prisma db push
npx prisma generate

## lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}


## shadcn init

npx shadcn@latest init

npm install next-themes

## tanstack query
npm install @tanstack/react-query

#### ###########################################################################
# TaskForge

TaskForge is a learning-focused project management application built with **Next.js, TypeScript, TanStack Query, Zustand, Prisma, PostgreSQL, Neon, and shadcn/ui**.

The purpose of this project is not only to build a useful application, but also to understand how a modern Next.js application works internally:

* Server Components vs Client Components
* Authentication and sessions
* API routes
* Database access with Prisma
* PostgreSQL
* TanStack Query
* Mutations and cache invalidation
* Zustand
* Responsive layouts
* shadcn/ui
* TypeScript
* React hooks such as `useRef`, `useCallback`, and `useMemo`
* Authorization and project membership
* Later: optimistic updates and more advanced patterns

---

# 1. Project Goal

TaskForge is a project/task management application.

The initial application will support:

* User registration
* User login
* Session-based authentication
* Dashboard
* Projects
* Project members
* Project roles
* Tasks
* Task status
* Task priority
* Task assignees
* Comments

Later, we can add:

* Search
* Filtering
* Sorting
* Labels
* Due dates
* Activity history
* Notifications
* Attachments
* More advanced project-management features

The application is intentionally being built incrementally so that each architectural decision can be understood rather than simply copied.

---

# 2. Current Technology Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* Base UI
* Lucide React
* next-themes

## Data / Server State

* TanStack Query

## Client State

* Zustand

Zustand will be introduced when we need shared client-side state, especially for the dashboard/context sidebar.

## Backend

* Next.js Route Handlers
* Prisma ORM
* PostgreSQL
* Neon PostgreSQL

## Authentication

Custom session-based authentication using:

* Password hashing with Node.js `scrypt`
* Random session IDs
* HTTP-only cookies
* Database-backed sessions

---

# 3. High-Level Architecture

The application currently follows this general architecture:

```text
Browser
   │
   ▼
Next.js UI
   │
   ├── Server Components
   │      │
   │      └── Authentication / Server-side work
   │
   └── Client Components
          │
          ├── TanStack Query
          │
          └── User interactions
                    │
                    ▼
             Next.js API Routes
                    │
                    ▼
                 Prisma
                    │
                    ▼
             PostgreSQL / Neon
```

For example, loading projects works like this:

```text
ContextSidebar
      │
      ▼
useProjects()
      │
      ▼
TanStack Query
      │
      ▼
GET /api/projects
      │
      ▼
getCurrentUser()
      │
      ▼
Prisma
      │
      ▼
PostgreSQL
      │
      ▼
projects
      │
      ▼
TanStack Query cache
      │
      ▼
ContextSidebar
```

This separation is important.

The React UI does not directly talk to Prisma.

Instead:

```text
UI → API → Prisma → Database
```

---

# 4. Project Structure

The project is gradually being organized around responsibilities.

A simplified structure currently looks like:

```text
sandcastle/
│
├── app/
│   ├── api/
│   │   ├── login/
│   │   ├── logout/
│   │   ├── me/
│   │   ├── projects/
│   │   └── register/
│   │
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── projects/
│   │
│   ├── login/
│   ├── register/
│   │
│   └── generated/
│       └── prisma/
│
├── components/
│   ├── dashboard/
│   │   ├── dashboardShell.tsx
│   │   ├── dashSidebar.tsx
│   │   ├── contextSidebar.tsx
│   │   ├── mobileSidebar.tsx
│   │   ├── mobileContextSidebar.tsx
│   │   └── createProjectDialog.tsx
│   │
│   └── ui/
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── sheet.tsx
│       └── ...
│
├── data/
│   └── dashboard.json
│
├── hooks/
│   └── ...
│
├── lib/
│   ├── api.ts
│   ├── prisma.ts
│   └── auth/
│       ├── password.ts
│       └── session.ts
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── prisma.config.ts
│
└── ...
```

The exact structure will continue to evolve as the application grows.

---

# 5. Authentication

TaskForge currently uses custom session-based authentication.

The basic flow is:

```text
Register
   │
   ▼
Hash password
   │
   ▼
Create User
   │
   ▼
Login
   │
   ▼
Verify password
   │
   ▼
Create Session
   │
   ▼
Store session ID in HTTP-only cookie
```

The browser does not store the user's password.

Instead, the database stores a password hash.

---

# 6. Password Hashing

Password hashing is implemented using Node.js `crypto.scrypt`.

The password is combined with a random salt:

```text
password + salt
       │
       ▼
     scrypt
       │
       ▼
derived key
```

The database stores:

```text
salt:derivedKey
```

For login:

```text
entered password
       +
stored salt
       │
       ▼
     scrypt
       │
       ▼
new derived key
       │
       ▼
compare with stored key
```

`timingSafeEqual()` is used for the final comparison.

This prevents storing plaintext passwords.

---

# 7. Sessions

A successful login creates a random session ID.

Conceptually:

```text
User
 │
 └── Session
       ├── id
       ├── userId
       ├── expiresAt
       └── createdAt
```

The session ID is stored in an HTTP-only cookie.

The cookie is configured with:

```text
httpOnly
secure in production
sameSite=lax
expires
path=/
```

The browser sends this cookie automatically with requests.

---

# 8. Getting the Current User

The helper:

```ts
getCurrentUser()
```

does the following:

```text
Read session cookie
       │
       ▼
Find session in database
       │
       ▼
Check expiration
       │
       ▼
Find associated user
       │
       ▼
Return user
```

This allows protected pages and API routes to determine whether the user is authenticated.

For example:

```ts
const user = await getCurrentUser()

if (!user) {
  redirect("/login")
}
```

The dashboard layout uses this mechanism to protect the dashboard.

---

# 9. Dashboard Authentication

The dashboard has a server-side layout.

Conceptually:

```text
/dashboard
    │
    ▼
dashboard/layout.tsx
    │
    ▼
getCurrentUser()
    │
    ├── no user
    │      └── redirect("/login")
    │
    └── authenticated
           │
           ▼
      DashboardShell
```

This means the authentication check happens before rendering the protected dashboard area.

---

# 10. Database

TaskForge uses:

```text
PostgreSQL
    │
    ▼
Neon
    │
    ▼
Prisma
```

Neon provides the PostgreSQL database.

Prisma provides the type-safe database layer.

---

# 11. Prisma Configuration

Prisma uses a separate configuration file:

```text
prisma.config.ts
```

The database URL comes from:

```text
DATABASE_URL
```

The Prisma schema is located at:

```text
prisma/schema.prisma
```

Generated Prisma client code is placed under:

```text
app/generated/prisma
```

---

# 12. Prisma Client

The application has a reusable Prisma client:

```text
lib/prisma.ts
```

The client uses:

```text
@prisma/adapter-pg
```

with the PostgreSQL driver.

The application also stores the Prisma instance on `globalThis` during development to avoid repeatedly creating Prisma clients during hot reloads.

Conceptually:

```text
Application
    │
    ▼
lib/prisma.ts
    │
    ▼
PrismaClient
    │
    ▼
PostgreSQL
```

---

# 13. Current Database Models

The database currently contains six main models:

```text
User
Session
Project
ProjectMember
Task
Comment
```

---

# 14. User

The `User` model represents an application user.

Important fields:

```text
id
email
name
password
createdAt
updatedAt
```

A user can have:

```text
many sessions
many projects they created
many tasks
many comments
many project memberships
```

---

# 15. Session

`Session` represents a logged-in browser session.

Important fields:

```text
id
userId
expiresAt
createdAt
```

Relationship:

```text
User 1 ──────── * Session
```

Deleting a user also deletes their sessions because the relation uses cascade deletion.

---

# 16. Project

A project represents a workspace/project inside TaskForge.

Important fields:

```text
id
name
description
createdAt
updatedAt
createdById
```

A project has:

```text
many tasks
many project members
one creator
```

---

# 17. ProjectMember

`ProjectMember` connects users to projects.

This is a many-to-many relationship implemented through an explicit join model.

```text
User
 │
 ├── ProjectMember
 │
 ▼
Project
```

It also stores the user's role:

```text
OWNER
ADMIN
MEMBER
```

The database prevents duplicate membership:

```prisma
@@unique([projectId, userId])
```

This means one user cannot be added to the same project twice.

---

# 18. Why ProjectMember Exists

A project creator and a project member are not the same concept.

For example:

```text
createdById = 5
```

means:

> User 5 originally created this project.

But:

```text
ProjectMember
userId = 5
role = OWNER
```

means:

> User 5 currently has OWNER permissions in this project.

Keeping these concepts separate gives us flexibility later.

For example, another member could become an administrator without changing the original creator.

---

# 19. Task

A `Task` belongs to a project.

Important fields:

```text
id
title
description
status
priority
createdAt
updatedAt
projectId
assigneeId
```

Current task statuses:

```text
TODO
IN_PROGRESS
DONE
```

Current priorities:

```text
LOW
MEDIUM
URGENT
```

A task can optionally have an assignee.

---

# 20. Comment

A comment belongs to both:

```text
Task
User
```

This allows us to answer:

```text
Who wrote the comment?
Which task does the comment belong to?
```

---

# 21. Database Relationship Overview

The current model can be visualized as:

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
             ┌─────────────┼──────────────┐
             │             │              │
             ▼             ▼              ▼
         Session      ProjectMember      Comment
                           │              │
                           ▼              ▼
                       Project          Task
                           │
                           ▼
                          Task
```

More specifically:

```text
User
 ├── Session[]
 ├── Project[]          created projects
 ├── ProjectMember[]
 ├── Task[]             assigned tasks
 └── Comment[]

Project
 ├── createdBy → User
 ├── ProjectMember[]
 └── Task[]

Task
 ├── Project
 ├── User?              assignee
 └── Comment[]

Comment
 ├── Task
 └── User
```

---

# 22. Project Creation

Project creation is one of the first complete features.

The flow is:

```text
User clicks "+"
       │
       ▼
Create Project Dialog
       │
       ▼
TanStack Query mutation
       │
       ▼
POST /api/projects
       │
       ▼
Authenticate user
       │
       ▼
Create Project
       │
       ▼
Create ProjectMember
(role = OWNER)
       │
       ▼
Transaction commits
       │
       ▼
Return project
       │
       ▼
Invalidate ["projects"]
       │
       ▼
Sidebar fetches projects again
```

---

# 23. Why a Database Transaction Is Used

Creating a project requires two database operations:

```text
1. Create Project
2. Create ProjectMember
```

These should succeed or fail together.

Therefore we use:

```ts
prisma.$transaction(...)
```

Conceptually:

```text
BEGIN TRANSACTION

Create Project

Create ProjectMember

COMMIT
```

If something fails:

```text
ROLLBACK
```

This prevents situations such as:

```text
Project exists
BUT
Owner membership doesn't exist
```

---

# 24. Projects API

The current endpoint is:

```text
GET /api/projects
POST /api/projects
```

File:

```text
app/api/projects/route.ts
```

---

# 25. GET /api/projects

The GET endpoint first authenticates the user.

Then it finds projects where the current user is a member.

Conceptually:

```text
Current User
     │
     ▼
ProjectMember
     │
     ▼
Projects
```

This is important because users should not simply receive every project in the database.

The API currently returns:

```json
{
  "projects": []
}
```

when the user has no projects.

---

# 26. POST /api/projects

The POST endpoint:

1. Gets the current user.
2. Reads the request body.
3. Validates the project name.
4. Creates the project.
5. Creates the OWNER membership.
6. Returns the created project.

The request looks conceptually like:

```json
{
  "name": "Website Redesign",
  "description": "Redesign the company website"
}
```

---

# 27. Generic API Helper

The application has:

```text
lib/api.ts
```

This provides a reusable wrapper around `fetch()`.

Instead of repeatedly writing:

```ts
fetch(...)
```

and handling JSON/errors manually, components can use:

```ts
api<T>(...)
```

For example:

```ts
api<ProjectsResponse>("/api/projects")
```

This gives us a consistent frontend-to-API pattern.

---

# 28. TanStack Query

TanStack Query is being used for **server state**.

This distinction is important.

Server state includes data such as:

```text
projects
tasks
comments
members
```

Client state includes things such as:

```text
sidebar width
sidebar collapsed state
dialog state
temporary UI state
```

TanStack Query is primarily responsible for the first category.

Zustand will be used for the second category when necessary.

---

# 29. useProjects

The project query lives in:

```text
use-projects.ts
```

The hook uses:

```ts
useQuery({
  queryKey: ["projects"],
  queryFn: getProjects,
})
```

The important concept is the query key:

```text
["projects"]
```

TanStack Query uses this key to identify the cached project data.

---

# 30. Project Query Flow

The ContextSidebar calls:

```ts
useProjects()
```

which calls:

```text
GET /api/projects
```

The result is stored in TanStack Query's cache.

So:

```text
ContextSidebar
       │
       ▼
useProjects()
       │
       ▼
TanStack Query
       │
       ▼
Cache
       │
       ▼
GET /api/projects
```

---

# 31. Mutation and Cache Invalidation

Creating a project uses:

```ts
useMutation()
```

After a successful project creation:

```ts
queryClient.invalidateQueries({
  queryKey: ["projec]()
```
