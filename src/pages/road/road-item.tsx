export function RoadItem({ status, text }: { status: boolean; text: string }) {
  return (
    <div className="road-item">
      <div
        className={
          status
            ? "road-item-status-completed"
            : "road-item-status-not-completed"
        }
      >
        {status && (
          <img
            src="./icons/approve-road.png"
            width={10}
            height={7}
            alt="completed"
          />
        )}
      </div>
      <div className="road-item-text">{text}</div>
    </div>
  );
}
