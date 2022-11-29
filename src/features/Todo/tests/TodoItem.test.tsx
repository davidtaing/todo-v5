import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { Todo } from "../../../types";

import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";

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

  it("navigates to /todo/:todoId when clicked", async () => {
    const todos: Todo[] = [
      {
        id: "1",
        userId: "1",
        title: "Sleep Early",
        completed: false,
        created: new Date(),
      },
    ];

    const user = userEvent.setup();

    const { result } = renderHook(() => {
      return useRouter();
    });

    render(<TodoList todos={todos} />);

    const todoItem = screen.getByRole("listitem", {
      name: /todo-item/i,
    });
    await user.click(todoItem);

    expect(result.current).toMatchObject({ asPath: "/todos/1" });
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
