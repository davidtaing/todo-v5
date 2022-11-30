import { useQuery } from "@tanstack/react-query";

import { TodoList } from "./TodoList";

import { getTodos } from "./api";

export const TodoListPage = () => {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (query.isLoading) {
    return (
      <div aria-label="todo-list page">
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div aria-label="todo-list page">
      <TodoList todos={query.data.todos} />
    </div>
  );
};
