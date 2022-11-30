import { render, screen } from "@testing-library/react";
import { TestQueryClientWrapper } from "../../../test/utils/TestQueryClientWrapper";
import { TodoList } from "../TodoList";

describe("TodoList", () => {
  test("smoke test if it renders", () => {
    render(<TodoList todos={[]} />, { wrapper: TestQueryClientWrapper });

    expect(screen.queryByRole("list")).toBeTruthy();
  });
});
