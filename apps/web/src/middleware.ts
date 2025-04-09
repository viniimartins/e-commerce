import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const token = cookies.get('token')

  const protectedRoutes = [
    '/profile',
    '/wishlist',
    '/checkout',
    '/panel/:path*',
  ]

  if (protectedRoutes.includes(nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/profile', '/wishlist', '/checkout', '/panel/:path*'],
}
