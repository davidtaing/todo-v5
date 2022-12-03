import { rest } from "msw";
import { Todo } from "../../types";
import { getRandomInt } from "../../utils/utils";

export const getTodos = rest.get(
  "http://localhost:3000/api/todos",
  async (req, res, ctx) => {
    const todos: Todo[] = [
      {
        id: "1",
        userId: "1",
        title: "Sleep Early",
        completed: true,
        created: new Date(),
      },
      {
        id: "2",
        userId: "1",
        title: "Wake Up Early",
        completed: true,
        created: new Date(),
      },
      {
        id: "3",
        userId: "1",
        title: "Walk the Cat",
        completed: true,
        created: new Date(),
      },
      {
        id: "4",
        userId: "1",
        title: "Feed the Dog",
        completed: false,
        created: new Date(),
      },
      {
        id: "5",
        userId: "1",
        title: "Setup CircleCI",
        completed: false,
        created: new Date(),
      },
      {
        id: "6",
        userId: "1",
        title: "Write some unit tests",
        completed: false,
        created: new Date(),
      },
      {
        id: "7",
        userId: "1",
        title: "Write some integration tests",
        completed: false,
        created: new Date(),
      },
      {
        id: "8",
        userId: "1",
        title: "Build a Todo App",
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
  }
);

const deleteTodo = rest.delete(
  "http://localhost:3000/api/todos/:todoId",
  async (req, res, ctx) => {
    const { id } = req.params as { id: string };

    const todo: Todo = {
      id: id,
      userId: "1",
      title: "Sleep Early",
      completed: false,
      created: new Date(),
    };

    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        todo,
      })
    );
  }
);

const updateTodo = rest.patch(
  "http://localhost:3000/api/todos/:todoId",
  async (req, res, ctx) => {
    const { id } = req.params as { id: string };

    const todo: Todo = {
      id: id,
      userId: "1",
      title: "Sleep Early",
      completed: false,
      created: new Date(),
      ...req.json(),
    };

    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        ...todo,
      })
    );
  }
);

const createTodo = rest.post(
  "http://localhost:3000/api/todos",
  async (req, res, ctx) => {
    const todo = { id: getRandomInt(100, 200), ...req.json() };

    return res(ctx.delay(250), ctx.status(200), ctx.json(todo));
  }
);

export const TodoHandlers = [getTodos, deleteTodo, updateTodo, createTodo];
