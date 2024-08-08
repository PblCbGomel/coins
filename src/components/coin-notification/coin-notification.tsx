import { useContext } from "react";
import "./coin-notification.css";
import { UserContext } from "../../App";

export function CoinNotification() {
  const { user } = useContext(UserContext);
  return (
    <div className={`notification`}>
      <img src="../icons/notif.svg" />
      <p>You Got +{user?.earnedCoins} Peak Points</p>
    </div>
  );
}
