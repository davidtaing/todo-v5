import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

import { TodoList } from "../TodoList";
import { Todo } from "../../../types";

describe("TodoList", () => {
  it("navigates to /todo/:todoId when clicked", async () => {
    const todos: Todo[] = [
      {
        id: "1",
        userId: "1",
        title: "Sleep Early",
        completed: false,
        created: new Date(),
      },
    ];

    const user = userEvent.setup();

    const { result } = renderHook(() => {
      return useRouter();
    });

    render(<TodoList todos={todos} />);

    const todoItem = screen.getByRole("listitem", {
      name: /todo-item/i,
    });

    await user.click(todoItem);

    expect(result.current).toMatchObject({ asPath: "/todos/1" });
  });
});
