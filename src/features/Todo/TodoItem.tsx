import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
  onClick: () => void;
}

export const TodoItem = ({ todo, onClick }: TodoItemProps) => {
  return (
    <li key={todo.id} aria-label="todo-item" onClick={onClick}>
      {todo.title}
    </li>
  );
};
