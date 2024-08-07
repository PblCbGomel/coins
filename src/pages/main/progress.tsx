import { useEffect, useState } from "react";
import "./main.css";
import { GetFetch, PatchFetch } from "../../functions/fetch";
import { tg } from "../../App";
import { UserInfo } from "../../interfaces/user";
import { FARM_LIMIT } from "../../constants/time-limit";
import { CoinNotification } from "../../components/coin-notification/coin-notification";

export function ProgressBar({ userInfo }: { userInfo: UserInfo | undefined }) {
  const [currentDate, setCurrentDate] = useState(
    new Date().getTime() - new Date(userInfo?.lastFarmStart || "").getTime()
  );
  const [notificationCoins, setNotificationCoins] = useState(0);

  useEffect(() => {
    setCurrentDate(
      new Date().getTime() - new Date(userInfo?.lastFarmStart || "").getTime()
    );
  }, [userInfo]);

  if (!userInfo?.lastFarmStart) {
    return (
      <div
        className="bar"
        onClick={() => {
          PatchFetch({
            path: "/api/farmStart",
            query: { id: tg?.initDataUnsafe?.user?.id || "973750295" },
          });
        }}
      >
        {Boolean(notificationCoins) && (
          <CoinNotification coins={notificationCoins} />
        )}
        <p className="start-farming">Start farming</p>
      </div>
    );
  }
  return (
    <div
      className="bar"
      style={{
        background:
          currentDate / FARM_LIMIT == 1
            ? "#DC7B4E"
            : `linear-gradient(90.01deg, #6B6B6B ${
                (currentDate / FARM_LIMIT) * 100 - 0.01
              }%, #282828 0.01%, #282828 ${
                100 - (currentDate / FARM_LIMIT) * 100
              }%)`,
      }}
      onClick={() => {
        if (FARM_LIMIT - currentDate <= 0) {
          setNotificationCoins(userInfo?.earnedCoins);
          PatchFetch({
            path: "/api/collect",
            query: { id: tg?.initDataUnsafe?.user?.id || "973750295" },
          });
        }
      }}
    >
      {Boolean(notificationCoins + 1) && (
        <CoinNotification coins={notificationCoins} />
      )}
      <p className="farming">
        {currentDate / FARM_LIMIT < 1 ? "Farming " : "Claim +"}
        {Math.trunc(
          (currentDate / FARM_LIMIT > 1 ? 1 : currentDate / FARM_LIMIT) *
            userInfo?.earnedCoins *
            1000
        ) / 1000}
        PP
      </p>
      <p className="time">
        {currentDate / FARM_LIMIT < 1
          ? `${new Date(FARM_LIMIT - currentDate).getHours() - 3}h ${new Date(
              FARM_LIMIT - currentDate
            ).getMinutes()}m
        ${new Date(FARM_LIMIT - currentDate).getSeconds()}s`
          : ""}
      </p>
    </div>
  );
}
