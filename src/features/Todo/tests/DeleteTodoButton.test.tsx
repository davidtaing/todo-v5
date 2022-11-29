import { render, screen } from "@testing-library/react";
import { DeleteTodoButton } from "../DeleteTodoButton";

describe("DeleteTodoButton", () => {
  test("smoke test if its renders", () => {
    render(<DeleteTodoButton />);

    expect(screen.getByRole("button", { name: "❌" })).toBeTruthy();
  });
});
