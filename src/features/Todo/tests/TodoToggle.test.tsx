import { render, screen } from "@testing-library/react";

import { TodoToggle } from "../TodoToggle";

describe("TodoToggle", () => {
  test("smoke test if it renders", () => {
    render(<TodoToggle value={false} onToggleClick={() => {}} />);

    const toggle = screen.queryByRole("checkbox");

    expect(toggle).toBeTruthy();
  });
});
