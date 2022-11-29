import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../features/Todo/api/getTodo";
import { TodoList } from "../features/Todo";

export default function Home() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (query.isLoading) {
    return (
      <div className="homepage" aria-label="home-page">
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="homepage" aria-label="home-page">
      <TodoList todos={query.data.todos} />
    </div>
  );
}
