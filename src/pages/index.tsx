import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../features/Todo/api/getTodo";

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
      <ul>
        {query.data?.todos.map((item: any) => (
          <li key={item.id} aria-label="todo-item">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
