import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('sdm')?.value

  const publicPaths = ['/signin', '/signup']

  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.jwtSecretKey)
    const { payload } = await jwtVerify(token, secret)

    if (typeof payload.exp === 'number' && Date.now() >= payload.exp * 1000) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${payload.role}`, request.url))
    }

    return NextResponse.next()

  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)'],
}
