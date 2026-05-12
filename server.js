import express from "express";
import cors from "cors";
import { createClient } from "@libsql/client";

const app = express();
app.use(cors());
app.use(express.json());

const db = createClient({
  url: "file:tasks.db",
});