import { useRef } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import {
  getTodos,
  deleteTodo,
  updateTodo,
  createTodo,
  CreateTodoSchema,
} from "../api";
import { GetTodoResponse, Todo } from "../../../types";

export const useTodoRequests = () => {
  const dedupeCreateRequest = useRef(false);
  const queryClient = useQueryClient();
  const getTodoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  const todos = getTodoQuery.data?.todos;

  const onMutationSettled = () => {
    if (process.env.NODE_ENV !== "test")
      queryClient.invalidateQueries(["todos"]);
  };

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
    onSettled: onMutationSettled,
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
    onSettled: onMutationSettled,
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (createTodoRequestBody: CreateTodoSchema) => {
      await queryClient.cancelQueries(["todos"]);
      dedupeCreateRequest.current = true;

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
      dedupeCreateRequest.current = false;
      onMutationSettled();
    },
  });

  const onDeleteTodo = (id: string) => deleteTodoMutation.mutate(id);
  const onToggleClick = (todo: Todo) =>
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  const onCreateTodo = (createTodoRequestBody: CreateTodoSchema) => {
    if (dedupeCreateRequest.current === false)
      createTodoMutation.mutate(createTodoRequestBody);
  };

  return {
    todos,
    getTodoQuery,
    onDeleteTodo,
    onToggleClick,
    onCreateTodo,
    dedupeCreateRequest,
  };
};
