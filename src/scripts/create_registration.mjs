import { createClient } from "@libsql/client";

try {
  const client = createClient({
    url: "file:registration.db",
  });

  await client.execute(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

  console.log("Table created successfully");

  await client.close();
} catch (error) {
  console.error("Database error:", error);
}