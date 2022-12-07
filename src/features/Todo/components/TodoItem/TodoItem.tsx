import { useState } from "react";
import { Todo } from "../../../../types";
import { DeleteTodoButton } from "./DeleteTodoButton";
import { TodoToggle } from "./TodoToggle";

interface TodoItemProps {
  todo: Todo;
  onDeleteClick: () => void;
  onToggleClick: () => void;
}

export const TodoItem = ({
  todo,
  onDeleteClick,
  onToggleClick,
}: TodoItemProps) => {
  const [editable, setEditable] = useState(false);

  const onClick = () => {
    setEditable(true);
  };

  return (
    <li
      key={todo.id}
      aria-label="todo-item"
      className="flex justify-between gap-4 p-2 border"
    >
      <TodoToggle value={todo.completed} onToggleClick={onToggleClick} />
      {
        editable ?
          <input
            onClick={onClick}
            defaultValue={todo.title}
            className="w-full h-full text-center bg-slate-100"
          /> :
          <div
            onClick={onClick}
            aria-label="todo-item body"
            className={`${todo.completed ? "line-through" : ""}`}
          >
            {todo.title}
          </div>
      }
      
      <div className="block w-6 h-6">
        {todo.completed ? (
          <DeleteTodoButton onDeleteClick={onDeleteClick} />
        ) : null}
      </div>
    </li>
  );
};
