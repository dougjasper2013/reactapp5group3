import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:tasks.db",
});

await client.execute(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

console.log("Database created");

await client.close();