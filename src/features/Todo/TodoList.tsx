import { Todo } from "../../types";
import { useRouter } from "next/router";
import { TodoItem } from "./TodoItem";

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
      {todos.map((item: Todo) => (
        <TodoItem
          key={item.id}
          onClick={() => onTodoItemClick(item.id)}
          todo={item}
        />
      ))}
    </ul>
  );
};
