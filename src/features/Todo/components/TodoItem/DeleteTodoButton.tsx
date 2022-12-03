interface DeleteTodoButtonProps {
  onDeleteClick: () => void;
}

export const DeleteTodoButton = ({ onDeleteClick }: DeleteTodoButtonProps) => {
  return <button onClick={onDeleteClick}>❌</button>;
};
