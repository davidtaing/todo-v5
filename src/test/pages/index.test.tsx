import Home from "../../pages/index";
import { render } from "@testing-library/react";
import { TestQueryClientWrapper } from "../utils/TestQueryClientWrapper";

describe("Homepage", () => {
  test("smoke test if Home renders", () => {
    const container = render(<Home />, { wrapper: TestQueryClientWrapper });

    const home = container.queryByLabelText(/home-route/i);

    expect(home).toBeTruthy();
  });
});
