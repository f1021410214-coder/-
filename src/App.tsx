import { useState } from "react";
import type { Task, TaskStatus, Column } from "./types";
import { Column as KanbanColumn } from "./components/Column";
import { AddTaskForm } from "./components/AddTaskForm";
import { PomodoroTimer } from "./components/PomodoroTimer";
import "./index.css";

const COLUMNS: Column[] = [
  { id: "todo",        label: "📋 待辦" },
  { id: "in-progress", label: "⚡ 進行中" },
  { id: "done",        label: "✅ 完成" },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: "todo",
      pomodoros: 0,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleMoveTask = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handlePomodoroComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, pomodoros: task.pomodoros + 1 } : task
      )
    );
  };

  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");

  return (
    <div className="app">
      <header className="app-header">
        <h1>Focus Board</h1>
        <p className="app-subtitle">Kanban × Pomodoro</p>
      </header>
      <main className="app-body">
        <section className="kanban-section">
          <AddTaskForm onAdd={handleAddTask} />
          <div className="kanban-board">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                column={col}
                tasks={tasks.filter((t) => t.status === col.id)}
                onMove={handleMoveTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </section>
        <aside className="timer-section">
          <PomodoroTimer
            inProgressTasks={inProgressTasks}
            onComplete={handlePomodoroComplete}
          />
        </aside>
      </main>
    </div>
  );
}