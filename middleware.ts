import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is trying to access voting pages after voting
  if (request.nextUrl.pathname === "/dashboard") {
    // This will be handled client-side since we're using localStorage
    return NextResponse.next()
  }

  // Prevent access to thank-you page without voting
  if (request.nextUrl.pathname === "/thank-you") {
    // This will be handled client-side to check localStorage
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/thank-you"],
}
