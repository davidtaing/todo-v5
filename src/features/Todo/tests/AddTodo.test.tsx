import { render, screen } from "@testing-library/react";

import { AddTodo } from "../AddTodo";

describe("AddTodo", () => {
  test("smoke test if it renders", () => {
    render(<AddTodo />);

    expect(screen.queryByLabelText(/add-todo/i)).toBeTruthy();
  });
});
