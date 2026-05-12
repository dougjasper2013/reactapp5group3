import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const client = createClient({
  url: process.env.DB_URL || "file:src/data/tasks.db",
});
