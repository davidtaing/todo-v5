import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";

import { TodoListPage } from "../TodoListPage";

import { Todo } from "../../../types";
import { TestQueryClientWrapper } from "../../../test/utils/TestQueryClientWrapper";

describe("TodoListPage", () => {
  test("smoke test if it renders", async () => {
    render(<TodoListPage />, { wrapper: TestQueryClientWrapper });

    expect(screen.queryByLabelText(/todo-list page/i)).toBeTruthy();
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

    const container = render(<TodoListPage />, {
      wrapper: TestQueryClientWrapper,
    });

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

    render(<TodoListPage />, { wrapper: TestQueryClientWrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const beforeTodoItems = screen.queryAllByRole("listitem", {
      name: /todo-item/i,
    });

    expect(beforeTodoItems).toHaveLength(1);

    const deleteTodoButton = screen.getByRole("button", { name: "❌" });

    await user.click(deleteTodoButton);

    const afterTodoItems = screen.queryAllByRole("listitem", {
      name: /todo-item/i,
    });

    expect(afterTodoItems).toHaveLength(0);
  });

  test("toggling a Todo to 'complete' causes DeleteTodoButton to render", async () => {
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

    render(<TodoListPage />, { wrapper: TestQueryClientWrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.queryByRole("button", { name: "❌" })).toBeFalsy();

    const toggle = screen.getByRole("checkbox");

    await user.click(toggle);

    expect(screen.queryByRole("button", { name: "❌" })).toBeTruthy();
  });

  test("toggling a Todo to 'incomplete' causes DeleteTodoButton to disappear", async () => {
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

    render(<TodoListPage />, { wrapper: TestQueryClientWrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.queryByRole("button", { name: "❌" })).toBeTruthy();

    const toggle = screen.getByRole("checkbox");

    await user.click(toggle);

    expect(screen.queryByRole("button", { name: "❌" })).toBeFalsy();
  });

  test("create a new todo", async () => {
    server.use(
      rest.get("http://localhost:3000/api/todos", async (req, res, ctx) => {
        const todos: Todo[] = [];

        return res(
          ctx.status(200),
          ctx.json({
            todos,
          })
        );
      })
    );

    const user = userEvent.setup();

    render(<TodoListPage />, { wrapper: TestQueryClientWrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/^loading/i));

    const addTodoInput = screen.getByPlaceholderText(/^add todo/i);

    await user.click(addTodoInput);
    await user.keyboard("test todo");
    await user.keyboard("[enter]");

    const todoItem = screen.queryByRole("listitem", {
      name: /todo-item/i,
    });

    expect(todoItem).toBeTruthy();
  });

  it("prevents creating another todo when the createTodoMutation is running", async () => {
    server.use(
      rest.get("http://localhost:3000/api/todos", async (req, res, ctx) => {
        const todos: Todo[] = [];

        return res(
          ctx.status(200),
          ctx.json({
            todos,
          })
        );
      })
    );

    const user = userEvent.setup();

    render(<TodoListPage />, { wrapper: TestQueryClientWrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/^loading/i));

    const addTodoInput = screen.getByPlaceholderText(/^add todo/i);

    await user.click(addTodoInput);
    await user.keyboard("test todo");
    await user.keyboard("[enter]");

    const todoItemsBefore = screen.queryByRole("listitem", {
      name: /todo-item/i,
    });

    expect(todoItemsBefore).toBeTruthy();

    await user.click(addTodoInput);
    await user.keyboard("test todo");
    await user.keyboard("[enter]");

    const todoItemsAfter = screen.queryAllByRole("listitem", {
      name: /todo-item/i,
    });

    expect(todoItemsAfter).toHaveLength(1);
  });
});
