import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function getServerSession() {
  return await auth()
}

export async function requireAuth() {
  const session = await auth()
  if (!session || !session.user) {
    redirect("/auth/signin")
  }
  return session
}

export async function requireAdmin() {
  const session = await auth()
  if (!session || !session.user) {
    redirect("/auth/signin")
  }
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }
  return session
}


