import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const client = createClient({
    url: process.env.REGISTRATION_DB_URL ?? "",
  });

  const { email, name, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  await client.execute({
    sql: "INSERT INTO registrations (email, name, password) VALUES (?, ?, ?)",
    args: [email, name, hashedPassword],
  });

  return NextResponse.json({
    success: true,
    message: "Registration successful",
  });
}