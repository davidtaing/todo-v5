import { Todo } from "../../types";
import { useRouter } from "next/router";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  const router = useRouter();

  const onTodoItemClick = (id: string) => {
    router.push(`/todos/${id}`);
  };

  return (
    <ul>
      {todos.map((item: any) => (
        <li
          key={item.id}
          aria-label="todo-item"
          onClick={() => onTodoItemClick(item.id)}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
};
