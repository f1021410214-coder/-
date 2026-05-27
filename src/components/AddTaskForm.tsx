import { useState } from "react";

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <div className="add-task-form">
      <input
        className="input"
        type="text"
        placeholder="新增任務..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button className="btn btn--primary" onClick={handleSubmit}>
        新增
      </button>
    </div>
  );
}