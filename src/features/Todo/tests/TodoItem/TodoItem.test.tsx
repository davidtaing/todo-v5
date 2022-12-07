import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import { Todo } from "../../../../types";

import { TodoItem } from "../../components/TodoItem";

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
      <TodoItem todo={todo} onDeleteClick={() => {}} onToggleClick={() => {}} />
    );

    const todoItem = screen.queryByRole("listitem", {
      name: /todo-item/i,
    });

    expect(todoItem).toBeTruthy();
  });

  it("navigates to /todo/:todoId when clicked", async () => {
    const todo: Todo = {
      id: "1",
      userId: "1",
      title: "Sleep Early",
      completed: false,
      created: new Date(),
    };

    const user = userEvent.setup();

    const { result } = renderHook(() => {
      return useRouter();
    });

    render(
      <TodoItem todo={todo} onDeleteClick={() => {}} onToggleClick={() => {}} />
    );

    const todoItem = screen.getByLabelText(/todo-item body/i);
    await user.click(todoItem);

    expect(result.current).toMatchObject({ asPath: "/todos/1" });
  });

  it("does not render DeleteTodoButton when Todo is incomplete", () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Test if DeleteTodoButton does not render",
      completed: false,
      created: new Date(),
    };

    render(
      <TodoItem todo={todo} onDeleteClick={() => {}} onToggleClick={() => {}} />
    );

    expect(screen.queryByRole("button", { name: "❌" })).toBeFalsy();
  });

  it("renders DeleteTodoButton when Todo is complete", () => {
    const todo = {
      id: "1",
      userId: "1",
      title: "Test if DeleteTodoButton renders",
      completed: true,
      created: new Date(),
    };

    render(
      <TodoItem todo={todo} onDeleteClick={() => {}} onToggleClick={() => {}} />
    );

    expect(screen.getByRole("button", { name: "❌" })).toBeTruthy();
  });
});
