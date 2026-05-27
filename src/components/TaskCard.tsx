import type { Task, TaskStatus } from "../types";

interface TaskCardProps {
  task: Task;
  onMove: (id: string, newStatus: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const STATUS_ORDER: TaskStatus[] = ["todo", "in-progress", "done"];

export function TaskCard({ task, onMove, onDelete }: TaskCardProps) {
  const currentIndex = STATUS_ORDER.indexOf(task.status);
  const canGoBack    = currentIndex > 0;
  const canGoForward = currentIndex < STATUS_ORDER.length - 1;

  return (
    <div className={`task-card task-card--${task.status}`}>
      <div className="task-card-body">
        <p className="task-title">{task.title}</p>
        {task.pomodoros > 0 && (
          <span className="task-pomodoros">
            {"🍅".repeat(Math.min(task.pomodoros, 5))}
            {task.pomodoros > 5 ? ` ×${task.pomodoros}` : ""}
          </span>
        )}
      </div>
      <div className="task-card-actions">
        <button
          className="btn btn--ghost"
          onClick={() => onMove(task.id, STATUS_ORDER[currentIndex - 1])}
          disabled={!canGoBack}
        >←</button>
        <button
          className="btn btn--ghost"
          onClick={() => onMove(task.id, STATUS_ORDER[currentIndex + 1])}
          disabled={!canGoForward}
        >→</button>
        <button
          className="btn btn--danger"
          onClick={() => onDelete(task.id)}
        >×</button>
      </div>
    </div>
  );
}