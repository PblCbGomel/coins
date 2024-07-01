import "./tasks.css";

export type TaskState = "enable" | "disable" | "completed" | "claim";

export interface Task {
  taskHeader: string;
  taskText: string;
  state: TaskState;
}

export function TaskCard({ taskHeader, taskText, state }: Task) {
  return (
    <div className="task-card">
      <div className="task-info">
        <h3>{taskHeader}</h3>
        <p>{taskText}</p>
      </div>
      <div className="task-btn-wrapper">
        {state === "completed" ? (
          <img
            src="./icons/completed.png"
            alt="completed"
            width={20}
            height={20}
          />
        ) : (
          <button className={"task-btn-" + state}>
            {state === "enable" ? "Start" : "Claim!"}
          </button>
        )}
      </div>
    </div>
  );
}
