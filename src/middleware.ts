import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from './server/utils';
import { tokenEnums } from './utils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(tokenEnums.refreshToken)?.value

  if (pathname.startsWith("/auth") || (pathname === "/" && !token)) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/user/signin', request.url))
  }

  try {
    const payload = await decodeJwt(token)

    if (typeof payload.exp === 'number' && Date.now() >= payload.exp * 1000) {
      return NextResponse.redirect(new URL(`/auth/${payload.role}/signin`, request.url))
    }

    if (payload.role === "user" && payload.approvalStatus !== "approved") {
      return NextResponse.redirect(new URL(`/auth/${payload.approvalStatus}`, request.url))
    }

    if (pathname.startsWith("/admin") && payload.role !== "admin") {
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|imgs).*)'],
}
