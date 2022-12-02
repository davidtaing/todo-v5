import { CreateTodoSchema } from "./api";

interface AddTodoProps {
  onCreateTodo: (createTodoRequestBody: CreateTodoSchema) => void;
}

export const AddTodo = ({ onCreateTodo }: AddTodoProps) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      title: { value: string };
    };

    onCreateTodo({ title: target.title.value });
  };

  return (
    <form aria-label="add-todo" onSubmit={onSubmit}>
      <input placeholder="Add Todo" />
    </form>
  );
};
