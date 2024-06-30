import { taskCards } from "../../constants/task-cards";
import { TaskCard } from "./task-card";
import "./tasks.css";

export function TasksPage() {
  return (
    <div className="tasks-wrapper">
      <div className="tasks-header">
        <div className="tasks-logo">
          <h2>Tasks</h2>
        </div>
      </div>
      <div className="tasks-list">
        {taskCards.map((task) => {
          return <TaskCard {...task} />;
        })}
      </div>
    </div>
  );
}
