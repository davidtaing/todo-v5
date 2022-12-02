import fetch from "node-fetch";

import { Todo } from "../../../types";

export const updateTodosUrl = "http://localhost:3000/api/todos";

export const updateTodo = async (todo: Todo) => {
  const { id, ...otherTodoProps } = todo;

  const response = await fetch(`${updateTodosUrl}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(otherTodoProps),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
