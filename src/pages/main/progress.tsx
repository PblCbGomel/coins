import "./main.css";

export function ProgressBar() {
  return (
    <div className="bar">
      <div style={{ width: `${45}%` }} className="progress"></div>
      <p className="farming">Farming 4.616</p>
      <p className="time">04h 39m</p>
    </div>
  );
}
