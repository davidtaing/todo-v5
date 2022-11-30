import Home from "../../pages/index";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { rest } from "msw";
import { server } from "../../mocks/server";
import { Todo } from "../../types";
import { TestQueryClientWrapper } from "../utils/TestQueryClientWrapper";
import userEvent from "@testing-library/user-event";

describe("Homepage", () => {
  test("smoke test if Home renders", () => {
    const container = render(<Home />, { wrapper: TestQueryClientWrapper });

    const home = container.queryByLabelText(/home-route/i);

    expect(home).toBeTruthy();
  });

  it("renders a list of items when it fetches todos", async () => {
    server.use(
      rest.get("http://localhost:3000/api/todos", async (req, res, ctx) => {
        const todos: Todo[] = [
          {
            id: "1",
            userId: "1",
            title: "Sleep Early",
            completed: false,
            created: new Date(),
          },
          {
            id: "2",
            userId: "1",
            title: "Wake Up Early",
            completed: false,
            created: new Date(),
          },
        ];

        return res(
          ctx.status(200),
          ctx.json({
            todos,
          })
        );
      })
    );

    const container = render(<Home />, { wrapper: TestQueryClientWrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const listItems = container.queryAllByRole("listitem", {
      name: /todo-item/i,
    });

    expect(listItems.length).toBe(2);
  });

  test("deletes the Todo when the DeleteTodoButton is clicked", async () => {
    server.use(
      rest.get("http://localhost:3000/api/todos", async (req, res, ctx) => {
        const todos: Todo[] = [
          {
            id: "1",
            userId: "1",
            title: "Sleep Early",
            completed: true,
            created: new Date(),
          },
        ];

        return res(
          ctx.status(200),
          ctx.json({
            todos,
          })
        );
      })
    );

    const user = userEvent.setup();

    render(<Home />, { wrapper: TestQueryClientWrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const beforeTodoItems = screen.queryAllByRole("listitem", {
      name: /todo-item/i,
    });

    expect(beforeTodoItems).toHaveLength(1);

    const deleteTodoButton = screen.getByRole("button", { name: "❌" });
    await user.click(deleteTodoButton);

    await waitForElementToBeRemoved(() => screen.getByText(/sleep early/i));

    const afterTodoItems = screen.queryAllByRole("listitem", {
      name: /todo-item/i,
    });

    expect(afterTodoItems).toHaveLength(0);
  });
});
