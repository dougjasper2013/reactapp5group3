import { createClient } from '@libsql/client';
const client = createClient({
  url: 'file:src/data/task-manager.db',
});

await client.execute(`DROP TABLE IF EXISTS tasks`);

await client.execute(
  `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL, 
    completed INTEGER NOT NULL DEFAULT 0
  )`,
);

const tasks = [
  {
    title: "walk the dog",
    completed: 0,
  },
  {
    title: "Do React Assignment 2",
    completed: 1,
  },
  {
    title: "Do React Assignment 3",
    completed: 0,
  },
];

for (const task of tasks) {
  await client.execute({
    sql: 'INSERT INTO tasks (title, completed) VALUES (?, ?)',
    args: [task.title, task.completed],
  });
}

client.close();

console.log('Database created');