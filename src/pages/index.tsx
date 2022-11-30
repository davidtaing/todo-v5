import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../features/Todo/api";
import { TodoList } from "../features/Todo";

export default function HomeRoute() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (query.isLoading) {
    return (
      <div className="home-route" aria-label="home-route">
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="home-route" aria-label="home-route">
      <TodoList todos={query.data.todos} />
    </div>
  );
}
