import { useState, useEffect, useRef } from "react";
import type { Task } from "../types";

const POMODORO_SECONDS = 25 * 60;

interface PomodoroTimerProps {
  inProgressTasks: Task[];
  onComplete: (taskId: string) => void;
}

export function PomodoroTimer({ inProgressTasks, onComplete }: PomodoroTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(POMODORO_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // 任務被刪除時重置
  useEffect(() => {
    const stillExists = inProgressTasks.some((t) => t.id === selectedTaskId);
    if (!stillExists && selectedTaskId !== null) {
      setSelectedTaskId(null);
      setIsRunning(false);
      setSecondsLeft(POMODORO_SECONDS);
    }
  }, [inProgressTasks, selectedTaskId]);

  // 計時器
  useEffect(() => {
    if (!isRunning) return;
    let current = secondsLeft;
    const id = window.setInterval(() => {
      current -= 1;
      if (current <= 0) {
        clearInterval(id);
        setIsRunning(false);
        setSecondsLeft(POMODORO_SECONDS);
        if (selectedTaskId) onCompleteRef.current(selectedTaskId);
      } else {
        setSecondsLeft(current);
      }
    }, 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(POMODORO_SECONDS);
  };

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  const progress = (secondsLeft / POMODORO_SECONDS) * 100;

  return (
    <div className="pomodoro-timer">
      <h2 className="timer-title">番茄鐘</h2>
      {inProgressTasks.length === 0 ? (
        <p className="timer-hint">將任務移至「進行中」即可開始計時</p>
      ) : (
        <>
          <div className="timer-select-wrap">
            <select
              className="timer-select"
              value={selectedTaskId ?? ""}
              onChange={(e) => {
                setSelectedTaskId(e.target.value || null);
                setIsRunning(false);
                setSecondsLeft(POMODORO_SECONDS);
              }}
            >
              <option value="">── 選擇任務 ──</option>
              {inProgressTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>
          {selectedTaskId && (
            <>
              <div className="timer-circle-wrap">
  <svg className="timer-svg" viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="54" className="timer-track" />
    <circle
      cx="60" cy="60" r="54"
      className="timer-progress"
      strokeDasharray="339.3"
      strokeDashoffset={339.3 * (1 - progress / 100)}
    />
    <text
  x="60" y="60"
  textAnchor="middle"
  dominantBaseline="central"
  fill="white"
  fontSize="16"
  fontWeight="600"
  fontFamily="Arial, sans-serif"
  transform="rotate(90, 60, 60)"
>
  {minutes}:{seconds}
</text>
  </svg>
</div>
              <div className="timer-controls">
                <button className="btn btn--primary" onClick={() => setIsRunning((r) => !r)}>
                  {isRunning ? "暫停" : "開始"}
                </button>
                <button className="btn btn--ghost" onClick={handleReset}>重置</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}