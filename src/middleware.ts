import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('sdm')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.jwtSecretKey)
    const { payload } = await jwtVerify(token, secret)

    if (typeof payload.exp === 'number' && Date.now() >= payload.exp * 1000) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()

  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: ['/'],
}
