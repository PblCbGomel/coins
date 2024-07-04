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
      <p className="tasks-info">
        We will reward you immediately with coins after each task competition
      </p>
      <div className="tasks-list">
        {taskCards.map((task, index) => {
          return <TaskCard key={task.taskHeader + index} {...task} />;
        })}
        <div className="empty-div"></div>
      </div>
    </div>
  );
}
