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

  it("body changes into an input when clicked", async () => {
    const user = userEvent.setup();

    const todo = {
      id: "1",
      userId: "1",
      title: "Body changes into input",
      completed: false,
      created: new Date(),
    };

    render(
      <TodoItem todo={todo} onDeleteClick={() => { }} onToggleClick={() => { }} />
    );

    const bodyDiv = screen.getByText(/^body changes into input$/i);

    await user.click(bodyDiv);

    expect(screen.queryByText(/^body changes into input$/i)).toBeFalsy();
    expect(screen.getByDisplayValue(/^body changes into input$/i)).toBeTruthy();
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
