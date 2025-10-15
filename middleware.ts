import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Ścieżki publiczne
  const publicPaths = ["/auth/signin", "/auth/signup"]
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))
  const isAuthAPI = pathname.startsWith("/api/auth")

  // Jeśli to ścieżka publiczna lub API auth, pozwól
  if (isPublicPath || isAuthAPI) {
    return NextResponse.next()
  }

  // Jeśli nie zalogowany, przekieruj na stronę logowania
  if (!session) {
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Ochrona panelu admina - tylko dla ADMIN
  if (pathname.startsWith("/admin")) {
    if (session.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Dopasuj wszystkie ścieżki oprócz:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

