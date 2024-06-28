import "./upgrade.css";

export function UpgradeCard({
  headerMainText,
  headerSecondText,
  progress,
  progressTop,
  text,
  cost,
}: {
  headerMainText: string;
  headerSecondText: string;
  progress: number;
  progressTop: number;
  text: string;
  cost: string;
}) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="header-text">
          <h3>{headerMainText}</h3>
          <p>{headerSecondText}</p>
        </div>
        <div className="progress-card">{`${progress} of ${progressTop}`}</div>
      </div>
      <div className="text-and-bar">
        <div className="text">{text}</div>
        <div className="bar-card">
          <div
            style={{ width: `${(progress / progressTop) * 100}%` }}
            className="progress-bar-card"
          ></div>
        </div>
      </div>
      <div className="card-footer">
        <p className="cost">{`${cost} CF`}</p>
        <button className="upgrade-btn">Upgrade!</button>
      </div>
    </div>
  );
}
