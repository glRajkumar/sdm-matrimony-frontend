import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from './server/utils';
import { tokenEnums } from './utils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(tokenEnums.refreshToken)?.value

  if (pathname === "/auth/super-admin/signin") {
    return NextResponse.redirect(new URL('/auth/admin/signin', request.url))
  }

  const protecteds = ["/user", "/admin", "/super-admin"]
  if (!protecteds.some(e => pathname.startsWith(e)) || (pathname === "/" && !token)) {
    return NextResponse.next()
  }

  if (!token) {
    const base = pathname.includes("admin") ? "admin" : "user"
    return NextResponse.redirect(new URL(`/auth/${base}/signin`, request.url))
  }

  try {
    const payload = await decodeJwt(token)

    if (typeof payload.exp === 'number' && Date.now() >= payload.exp * 1000) {
      return NextResponse.redirect(new URL(`/auth/${payload.role}/signin`, request.url))
    }

    if (payload.role === "user" && payload.approvalStatus !== "approved") {
      return NextResponse.redirect(new URL(`/auth/${payload.approvalStatus}`, request.url))
    }

    if (pathname !== "/" && !pathname.startsWith(`/${payload.role}`)) {
      return NextResponse.redirect(new URL(`/auth/unauthorized`, request.url))
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${payload.role}`, request.url))
    }

    return NextResponse.next()

  } catch (error) {
    return NextResponse.redirect(new URL('/auth/user/signin', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|imgs|icons|logos|browserconfig|manifest.json).*)'],
}
