import "./instrument.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";

import { getAllTodos, addTodo, toggleTodo, deleteTodo } from "./todos.js";

dotenv.config();

export const app = express();

Sentry.setupExpressErrorHandler(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/todos", async (req, res) => {
  const todos = await getAllTodos();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const { text } = req.body;
  const todo = await addTodo(text);
  res.json(todo);
});

app.patch("/api/todos/:id", async (req, res) => {
  const todo = await toggleTodo(req.params.id);
  res.json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  const todo = await deleteTodo(req.params.id);
  res.json(todo);
});

app.get("/debug-sentry", () => {
  throw new Error("Sentry test");
});

Sentry.setupExpressErrorHandler(app);
