import request from "supertest";
import { describe, it, expect, vi } from "vitest";
import { app } from "../app.js";
import * as db from "../todos.js";

vi.spyOn(db, "getAllTodos").mockResolvedValue([
  {
    id: "1",
    text: "Test todo",
    completed: false,
    createdAt: "2025-11-02T10:31:28.876Z",
  },
]);

describe("GET /api/todos", () => {
  it("returns todos", async () => {
    const res = await request(app).get("/api/todos");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        id: "1",
        text: "Test todo",
        completed: false,
        createdAt: "2025-11-02T10:31:28.876Z",
      },
    ]);
  });
});

describe("POST /api/todos", () => {
  it("creates a todo", async () => {
    vi.spyOn(db, "addTodo").mockResolvedValue({
      id: "2",
      text: "New Todo",
      completed: false,
      createdAt: "2025-11-02T12:00:00.000Z",
    });

    const res = await request(app)
      .post("/api/todos")
      .send({ text: "New Todo" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: "2",
      text: "New Todo",
      completed: false,
      createdAt: "2025-11-02T12:00:00.000Z",
    });
  });
});
