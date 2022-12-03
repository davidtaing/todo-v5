import { CreateTodoSchema } from "./api";

interface AddTodoProps {
  onCreateTodo: (createTodoRequestBody: CreateTodoSchema) => void;
  disabled: boolean;
}

export const AddTodo = ({ onCreateTodo, disabled }: AddTodoProps) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      title: { value: string };
    };

    onCreateTodo({ title: target.title.value });
  };

  return (
    <form aria-label="add-todo" onSubmit={onSubmit}>
      <fieldset disabled={disabled}>
        <input placeholder="Add Todo" />
      </fieldset>
    </form>
  );
};
