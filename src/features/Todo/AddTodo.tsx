import { useEffect, useState } from "react";
import { CreateTodoSchema } from "./api";

interface AddTodoProps {
  onCreateTodo: (createTodoRequestBody: CreateTodoSchema) => void;
  disabled: boolean;
}

export const AddTodo = ({ onCreateTodo, disabled }: AddTodoProps) => {
  const [title, setTitle] = useState("");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    onCreateTodo({ title });
  };

  useEffect(() => {
    if (!disabled) setTitle("");
  }, [disabled]);

  return (
    <form aria-label="add-todo" onSubmit={onSubmit} method="POST">
      <fieldset disabled={disabled}>
        <input
          placeholder="Add Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </fieldset>
    </form>
  );
};
