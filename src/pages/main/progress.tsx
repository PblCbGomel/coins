import { useEffect, useState } from "react";
import "./main.css";
import { GetFetch, PatchFetch } from "../../functions/fetch";
import { tg } from "../../App";
import { UserInfo } from "../../interfaces/user";
import { FARM_LIMIT } from "../../constants/time-limit";

export function ProgressBar({ userInfo }: { userInfo: UserInfo | undefined }) {
  const [currentDate, setCurrentDate] = useState(
    new Date().getTime() - new Date(userInfo?.lastFarmStart || "").getTime()
  );

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
            query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
          });
        }}
      >
        <p className="start-farming">Start farming</p>
      </div>
    );
  }
  return (
    <div
      className="bar"
      style={{
        background: `linear-gradient(90.01deg, #993902 0.01%, #df7e51 ${
          (currentDate / FARM_LIMIT) * 100 - 0.01
        }%, #282828 0.01%, #282828 ${100 - (currentDate / FARM_LIMIT) * 100}%)`,
      }}
      onClick={() => {
        if (FARM_LIMIT - currentDate <= 0) {
          PatchFetch({
            path: "/api/collect",
            query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
          });
        }
      }}
    >
      <p className="farming">
        {currentDate / FARM_LIMIT < 1 ? "Farming" : "Collect"}{" "}
        {Math.trunc(
          (currentDate / FARM_LIMIT > 1 ? 1 : currentDate / FARM_LIMIT) *
            userInfo?.earnedCoins *
            1000
        ) / 1000}
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
