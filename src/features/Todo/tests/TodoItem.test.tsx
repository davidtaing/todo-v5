import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { TestQueryClientWrapper } from "../../../test/utils/TestQueryClientWrapper";
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

    render(
      <TodoItem todo={todo} onClick={() => {}} onDeleteClick={() => {}} />
    );

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

    render(<TodoList todos={todos} onDeleteTodo={() => {}} />, {
      wrapper: TestQueryClientWrapper,
    });

    const todoItem = screen.getByLabelText(/todo-item body/i);
    await user.click(todoItem);

    expect(result.current).toMatchObject({ asPath: "/todos/1" });
  });

  test("if DeleteTodoButton is not rendered when Todo is incomplete", () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Test if DeleteTodoButton does not render",
      completed: false,
      created: new Date(),
    };

    render(
      <TodoItem todo={todo} onClick={() => {}} onDeleteClick={() => {}} />
    );

    expect(screen.queryByRole("button", { name: "❌" })).toBeFalsy();
  });

  test("if DeleteTodoButton renders when Todo is complete", () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Test if DeleteTodoButton renders",
      completed: true,
      created: new Date(),
    };

    render(
      <TodoItem todo={todo} onClick={() => {}} onDeleteClick={() => {}} />
    );

    expect(screen.getByRole("button", { name: "❌" })).toBeTruthy();
  });
});
