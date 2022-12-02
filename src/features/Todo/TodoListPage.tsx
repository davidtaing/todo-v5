import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TodoList } from "./TodoList";

import {
  deleteTodo,
  getTodos,
  updateTodo,
  createTodo,
  CreateTodoSchema,
} from "./api";
import { GetTodoResponse, Todo } from "../../types";
import { TodoItem } from "./TodoItem";
import { AddTodo } from "./AddTodo";

export const TodoListPage = () => {
  const queryClient = useQueryClient();
  const getQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  const todos = getQuery.data?.todos;

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData<GetTodoResponse>([
        "todos",
      ]);

      if (previousTodos) {
        queryClient.setQueryData<GetTodoResponse>(["todos"], {
          todos: todos.filter((item: Todo) => item.id !== id),
        });
      }

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<GetTodoResponse>(
          ["todos"],
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (todo: Todo) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData<GetTodoResponse>([
        "todos",
      ]);

      if (previousTodos) {
        queryClient.setQueryData<GetTodoResponse>(["todos"], {
          todos: todos.map((item: Todo) => {
            if (item.id === todo.id) {
              return todo;
            }

            return item;
          }),
        });
      }

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<GetTodoResponse>(
          ["todos"],
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (createTodoRequestBody: CreateTodoSchema) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData<GetTodoResponse>([
        "todos",
      ]);

      const newTodo = {
        id: "",
        userId: "",
        completed: false,
        create: Date.now(),
        ...createTodoRequestBody,
      };

      if (previousTodos) {
        queryClient.setQueryData<GetTodoResponse>(["todos"], {
          todos: [...todos, newTodo],
        });
      }

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<GetTodoResponse>(
          ["todos"],
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const onDeleteTodo = (id: string) => deleteTodoMutation.mutate(id);
  const onToggleClick = (todo: Todo) =>
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  const onCreateTodo = (createTodoRequestBody: CreateTodoSchema) => {
    createTodoMutation.mutate(createTodoRequestBody);
  };

  if (getQuery.isLoading) {
    return (
      <div aria-label="todo-list page">
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div aria-label="todo-list page">
      <TodoList
        todos={todos}
        render={(data) =>
          data.map((item: Todo) => (
            <TodoItem
              key={item.id}
              onDeleteClick={() => onDeleteTodo(item.id)}
              onToggleClick={() => onToggleClick(item)}
              todo={item}
            />
          ))
        }
      />
      <AddTodo onCreateTodo={onCreateTodo} />
    </div>
  );
};
