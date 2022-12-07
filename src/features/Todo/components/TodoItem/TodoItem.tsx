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
  const variantStyles = todo.completed ? "line-through" : "bg-slate-100";

  const onInputBlur = () => {
    console.log("onInputBlur");
  };

  return (
    <li
      key={todo.id}
      aria-label="todo-item"
      className="flex justify-between gap-4 p-2 border"
    >
      <TodoToggle value={todo.completed} onToggleClick={onToggleClick} />

      <input
        onBlur={onInputBlur}
        defaultValue={todo.title}
        className={`${variantStyles} w-full h-full text-center`}
        disabled={todo.completed}
      />

      <div className="block w-6 h-6">
        {todo.completed ? (
          <DeleteTodoButton onDeleteClick={onDeleteClick} />
        ) : null}
      </div>
    </li>
  );
};
