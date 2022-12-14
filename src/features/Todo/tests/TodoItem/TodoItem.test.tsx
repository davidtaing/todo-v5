import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("does not allow editing when Todo is complete", async () => {
    const user = userEvent.setup();

    const todo = {
      id: "1",
      userId: "1",
      title: "does not enable editing",
      completed: true,
      created: new Date(),
    };

    render(
      <TodoItem todo={todo} onDeleteClick={() => {}} onToggleClick={() => {}} />
    );
    const bodyDiv = screen.getByDisplayValue(/^does not enable editing$/i);

    await user.click(bodyDiv);
    await user.keyboard("test");

    expect(screen.getByDisplayValue(/^does not enable editing$/i)).toBeTruthy();
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
});
