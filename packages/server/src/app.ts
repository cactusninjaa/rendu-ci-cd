import "./instrument.js";
import express from "express";
import cors from "cors";
import { getAllTodos, addTodo, toggleTodo, deleteTodo } from "./todos.js";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";

dotenv.config();

export const app = express();
Sentry.setupExpressErrorHandler(app);

app.use(cors());
app.use(express.json());

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
  const result = await deleteTodo(req.params.id);
  res.json(result);
});

Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", () => {
  throw new Error("Sentry test");
});
