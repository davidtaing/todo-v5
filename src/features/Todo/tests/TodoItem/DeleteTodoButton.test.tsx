import { render, screen } from "@testing-library/react";
import { DeleteTodoButton } from "../../components/TodoItem/DeleteTodoButton";

describe("DeleteTodoButton", () => {
  test("smoke test if it renders", () => {
    render(<DeleteTodoButton onDeleteClick={() => {}} />);

    expect(screen.getByText("❌")).toBeTruthy();
  });
});
