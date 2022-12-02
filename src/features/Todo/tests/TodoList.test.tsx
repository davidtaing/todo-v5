import { render, screen } from "@testing-library/react";
import { TodoList } from "../TodoList";

describe("TodoList", () => {
  test("smoke test if it renders", () => {
    render(<TodoList todos={[]} onDeleteTodo={() => {}} />);

    expect(screen.queryByRole("list")).toBeTruthy();
  });
});
