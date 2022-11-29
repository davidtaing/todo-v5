import { render, screen } from "@testing-library/react";

import { TodoItem } from "../TodoItem";

describe("DeleteTodoButton", () => {
  test("smoke test if its renders", () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Test if Component Renders",
      completed: false,
      created: new Date(),
    };

    render(<TodoItem todo={todo} onClick={() => {}} />);

    const todoItem = screen.queryByRole("listitem", {
      name: /todo-item/i,
    });

    expect(todoItem).toBeTruthy();
  });
});
