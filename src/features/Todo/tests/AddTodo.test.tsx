import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddTodo } from "../AddTodo";

describe("AddTodo", () => {
  test("smoke test if it renders", () => {
    render(<AddTodo onCreateTodo={() => {}} disabled={true} />);

    expect(screen.queryByLabelText(/^add-todo$/i)).toBeTruthy();
  });

  it("displays 'Add Todo' as placeholder text", () => {
    render(<AddTodo onCreateTodo={() => {}} disabled={true} />);

    expect(screen.queryByPlaceholderText(/add todo/i)).toBeTruthy();
  });

  it("prevents input when disabled", async () => {
    const user = userEvent.setup();

    render(<AddTodo onCreateTodo={() => {}} disabled={true} />);

    const addTodoInput = screen.getByPlaceholderText(/add todo/i);

    await user.click(addTodoInput);
    await user.keyboard("test");

    expect(screen.queryByPlaceholderText(/^test/i)).toBeFalsy();
  });
});
