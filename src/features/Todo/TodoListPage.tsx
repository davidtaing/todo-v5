import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TodoList } from "./TodoList";

import { deleteTodo, getTodos } from "./api";
import { GetTodoResponse, Todo } from "../../types";

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

  const onDeleteTodo = (id: string) => deleteTodoMutation.mutate(id);

  if (getQuery.isLoading) {
    return (
      <div aria-label="todo-list page">
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div aria-label="todo-list page">
      <TodoList todos={todos} onDeleteTodo={onDeleteTodo} />
    </div>
  );
};
