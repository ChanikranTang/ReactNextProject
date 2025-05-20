import { NextResponse } from "next/server";
import { jwtVerify, importJWK } from "jose";

export async function middleware(request) {
  console.log("test middleware");
  try {
    const token = request.cookies.get("token").value;
    console.log("token : " + token);
    const secretJWK = {
        kty : 'oct',
        k: process.env.JOSE_SECRET
    }
    const secretKey = await importJWK(secretJWK,'HS256')
    const payload = await jwtVerify(token,secretKey)//Verify 
    console.log(JSON.stringify(payload));
    if(payload.payload.email !== 'Gift209-11@hotmail.com'){
        console.log("email not equal")
        throw new Error('email incorrect')
    }
    console.log("pass email")
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user',JSON.stringify({email : payload.payload.email}))
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    })
    return response

  } catch (error) {
    return NextResponse.redirect(new URL('/',request.url))
  }
}

export const config = {
  matcher: "/manage/blog/:path*",
};
