interface TodoToggleProps {
  value: boolean;
  onToggleClick: () => void;
}

export const TodoToggle = ({ value, onToggleClick }: TodoToggleProps) => {
  return (
    <button
      role="checkbox"
      aria-checked={value}
      className="border border-red-500 h-4 p-4"
      onClick={onToggleClick}
    />
  );
};
