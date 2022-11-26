import Home from "../../pages/index";
import { render, screen } from "@testing-library/react";

describe("Homepage", () => {
  test("smoke test if Home renders", () => {
    const container = render(<Home />);

    expect(container).toBeTruthy();
  });
});
