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

  test("if DeleteTodoButton does not render when Todo is not Completed", () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Test if DeleteTodoButton does not render",
      completed: false,
      created: new Date(),
    };

    render(<TodoItem todo={todo} onClick={() => {}} />);

    expect(screen.queryByRole("button", { name: "❌" })).toBeFalsy();
  });

  test("if DeleteTodoButton renders when the Todo is completed", () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Test if DeleteTodoButton renders",
      completed: true,
      created: new Date(),
    };

    render(<TodoItem todo={todo} onClick={() => {}} />);

    expect(screen.getByRole("button", { name: "❌" })).toBeTruthy();
  });
});
