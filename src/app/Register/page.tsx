// Registration page for creating a new user account
"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

// Sends registration data to the backend API
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

// POST request to create a new user in registration.db
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
// Displays success or error message to the user
    const data = await response.json();
    setMessage(data.message);
  }

  return (
    <main>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  )
}