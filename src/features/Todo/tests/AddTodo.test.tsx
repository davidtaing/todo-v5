import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddTodo } from "../components/AddTodo";

describe("AddTodo", () => {
  test("smoke test if it renders", () => {
    render(<AddTodo onCreateTodo={() => {}} disabled={true} />);

    expect(screen.queryByLabelText(/^add-todo$/i)).toBeTruthy();
  });

  it("displays 'Add Todo' as placeholder text", () => {
    render(<AddTodo onCreateTodo={() => {}} disabled={true} />);

    expect(screen.queryByPlaceholderText(/new todo/i)).toBeTruthy();
  });

  it("prevents input when disabled", async () => {
    const user = userEvent.setup();

    render(<AddTodo onCreateTodo={() => {}} disabled={true} />);

    const addTodoInput = screen.getByPlaceholderText(/new todo/i);

    await user.click(addTodoInput);
    await user.keyboard("test");

    expect(screen.queryByDisplayValue(/^test/i)).toBeFalsy();
  });

  it("flushes input when disabled changes from true to false", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <AddTodo onCreateTodo={() => {}} disabled={false} />
    );

    const addTodoInput = screen.getByPlaceholderText(/new todo/i);

    await user.click(addTodoInput);
    await user.keyboard("test todo");
    await user.keyboard("[enter]");

    expect(screen.queryByDisplayValue(/test/i)).toBeTruthy();

    rerender(<AddTodo onCreateTodo={() => {}} disabled={true} />);
    rerender(<AddTodo onCreateTodo={() => {}} disabled={false} />);

    expect(screen.queryByDisplayValue(/test/i)).toBeFalsy();
  });

  it("cannot be submitted when the input is empty", async () => {
    const user = userEvent.setup();

    const submitHandler = jest.fn();

    render(<AddTodo onCreateTodo={submitHandler} disabled={false} />);

    const addTodoInput = screen.getByPlaceholderText(/new todo/i);
    const addTodoButton = screen.getByRole("button", { name: "Add Todo" });

    await user.click(addTodoInput);
    await user.click(addTodoButton);

    expect(submitHandler).toHaveBeenCalledTimes(0);
  });
});
