import { useQuery } from "@tanstack/react-query";

import { TodoList } from "./TodoList";

import { getTodos } from "./api";

export const TodoListPage = () => {
  const getQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (getQuery.isLoading) {
    return (
      <div aria-label="todo-list page">
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div aria-label="todo-list page">
      <TodoList todos={getQuery.data.todos} />
    </div>
  );
};
