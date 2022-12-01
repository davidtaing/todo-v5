import { Todo } from "../../types";
import { DeleteTodoButton } from "./DeleteTodoButton";
import { TodoToggle } from "./TodoToggle";

interface TodoItemProps {
  todo: Todo;
  onClick: () => void;
  onDeleteClick: () => void;
}

export const TodoItem = ({ todo, onClick, onDeleteClick }: TodoItemProps) => {
  return (
    <li key={todo.id} aria-label="todo-item">
      <TodoToggle />
      <div onClick={onClick} aria-label="todo-item body">
        {todo.title}
      </div>

      {todo.completed ? (
        <DeleteTodoButton onDeleteClick={onDeleteClick} />
      ) : null}
    </li>
  );
};
