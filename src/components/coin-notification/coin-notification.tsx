import { useContext } from "react";
import "./coin-notification.css";
import { UserContext } from "../../App";

export function CoinNotification() {
  const { user } = useContext(UserContext);
  return (
    <div className={`notification-coins`}>
      <img src="../icons/notif.svg" width={16} height={16} />
      <p>You Got +{user?.earnedCoins} Peak Points</p>
    </div>
  );
}
