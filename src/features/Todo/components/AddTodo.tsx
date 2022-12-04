import { useEffect, useState } from "react";
import { CreateTodoSchema } from "../api";

interface AddTodoProps {
  onCreateTodo: (createTodoRequestBody: CreateTodoSchema) => void;
  disabled: boolean;
}

export const AddTodo = ({ onCreateTodo, disabled }: AddTodoProps) => {
  const [title, setTitle] = useState("");

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (title !== "") {
      onCreateTodo({ title });
    }
  };

  useEffect(() => {
    if (!disabled) setTitle("");
  }, [disabled]);

  return (
    <form
      aria-label="add-todo"
      onSubmit={onSubmit}
      method="POST"
      className="block p-4"
    >
      <fieldset disabled={disabled}>
        <input
          placeholder="New Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-center w-full border border-slate-400 rounded py-2 px-3"
        />
        <button
          type="submit"
          className="mt-2 w-full py-2 px-3 rounded bg-slate-700 text-white"
        >
          Add Todo
        </button>
      </fieldset>
    </form>
  );
};
