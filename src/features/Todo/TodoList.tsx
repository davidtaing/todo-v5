import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TodoItem } from "./TodoItem";

import { deleteTodo } from "./api";
import { GetTodoResponse, Todo } from "../../types";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData<GetTodoResponse>([
        "todos",
      ]);

      if (previousTodos) {
        queryClient.setQueryData<GetTodoResponse>(["todos"], {
          todos: todos.filter((item) => item.id !== id),
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

  const onTodoItemClick = (id: string) => {
    router.push(`/todos/${id}`);
  };

  return (
    <ul>
      {todos.map((item: Todo) => (
        <TodoItem
          key={item.id}
          onClick={() => onTodoItemClick(item.id)}
          onDeleteClick={() => deleteTodoMutation.mutate(item.id)}
          todo={item}
        />
      ))}
    </ul>
  );
};
