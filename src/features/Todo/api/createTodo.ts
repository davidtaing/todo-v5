import fetch from "node-fetch";
import { Todo } from "../../../types";

export type CreateTodoSchema = Omit<Partial<Todo>, "id" | "title"> & {
  title: string;
};

export const createTodo = async (createTodoRequestBody: CreateTodoSchema) => {
  const response = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify(createTodoRequestBody),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
