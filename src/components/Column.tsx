import type { Task, TaskStatus, Column as ColumnType } from "../types";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onMove: (id: string, newStatus: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function Column({ column, tasks, onMove, onDelete }: ColumnProps) {
  return (
    <div className={`column column--${column.id}`}>
      <div className="column-header">
        <h2>{column.label}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="column-body">
        {tasks.length === 0 ? (
          <p className="empty-hint">拖拉或移動任務至此</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}