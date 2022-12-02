import { Todo } from "../../types";

interface TodoListProps {
  todos: Todo[];
  render: (todos: Todo[]) => React.ReactNode;
}

export const TodoList = ({ todos, render }: TodoListProps) => {
  return <ul>{render(todos)}</ul>;
};
