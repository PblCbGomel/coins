import "./coin-notification.css";

export function CoinNotification({ coins }: { coins: number }) {
  return (
    <div className={`notification`}>
      <img src="../icons/notif.svg" />
      <p>You Got +{coins} Peak Points</p>
    </div>
  );
}
