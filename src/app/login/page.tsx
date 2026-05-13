// Login page for existing users
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

// Sends login credentials to the backend API
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

// POST request to verify user login credentials
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setMessage(data.message);

// Saves logged-in user data locally for session persistence   
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    }
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit">Login</button>
      </form>
{/*Navigation button for users who need to create an account */}
      <p>Register here</p> 
      <Link href="/Register">
        <button type="button">Register</button>
      </Link>

      {message && <p>{message}</p>}
    </main>
  );
}