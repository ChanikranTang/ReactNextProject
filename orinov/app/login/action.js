"use server";
import { SignJWT, importJWK } from "jose";
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email !== "Gift209-11@hotmail.com" && password !== "1234") {
    return { message: "Login Fail" };
  }

  console.log(email, password);
  
  const secret = process.env.JOSE_SECRET;

if (!secret) {
  throw new Error("JOSE_SECRET is not defined");
}

  const secretJWK = {
    kty: "oct",
    k: secret,
  };

  const secretKey = await importJWK(secretJWK, "HS256");
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);


  console.log(token);

  cookies().set('token',token)  
  // return { message: "Login Pass" };
  redirect('/manage/blog')
}
