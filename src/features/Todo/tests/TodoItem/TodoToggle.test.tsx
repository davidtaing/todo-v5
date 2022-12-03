import { render, screen } from "@testing-library/react";

import { TodoToggle } from "../../components/TodoItem/TodoToggle";

describe("TodoToggle", () => {
  test("smoke test if it renders", () => {
    render(<TodoToggle value={false} onToggleClick={() => {}} />);

    const toggle = screen.queryByRole("checkbox");

    expect(toggle).toBeTruthy();
  });
});
