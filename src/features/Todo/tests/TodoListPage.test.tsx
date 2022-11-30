import { render, screen } from "@testing-library/react";

import { TodoListPage } from "../TodoListPage";

describe("TodoListPage", () => {
  test("smoke test if it renders", async () => {
    render(<TodoListPage />);

    expect(screen.queryByLabelText(/todo-list page/i)).toBeTruthy();
  });
});
