interface TodoToggleProps {
  value: boolean;
  onToggleClick: () => void;
}

export const TodoToggle = ({ value, onToggleClick }: TodoToggleProps) => {
  return (
    <button
      role="checkbox"
      aria-checked={value}
      className="border rounded-full border-slate-400 h-6 w-6"
      onClick={onToggleClick}
    />
  );
};
