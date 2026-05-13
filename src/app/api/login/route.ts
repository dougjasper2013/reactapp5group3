import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const client = createClient({
    url: process.env.REGISTRATION_DB_URL ?? "",
  });

  const {email, password} = await request.json();

  const result = await client.execute({
    sql: "SELECT * FROM registrations WHERE email = ?",
    args: [email],
  });

  const user = result.rows[0];

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!passwordMatches) {
    return NextResponse.json({
      success: false,
      message: "Invalid email or password",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}