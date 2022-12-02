import { render, screen } from "@testing-library/react";

import { AddTodo } from "../AddTodo";

describe("AddTodo", () => {
  test("smoke test if it renders", () => {
    render(<AddTodo onCreateTodo={() => {}} />);

    expect(screen.queryByLabelText(/add-todo/i)).toBeTruthy();
  });

  it("displays 'Add Todo' as placeholder text", () => {
    render(<AddTodo onCreateTodo={() => {}} />);

    expect(screen.queryByPlaceholderText(/add todo/i)).toBeTruthy();
  });
});
