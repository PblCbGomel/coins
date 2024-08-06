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
      onClick={() => {
        if (FARM_LIMIT - currentDate <= 0) {
          PatchFetch({
            path: "/api/collect",
            query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
          });
        }
      }}
    >
      <div
        style={{
          width: `${(currentDate / FARM_LIMIT) * 100}%`,
          minWidth: "60px",
          borderTopRightRadius:
            (currentDate / FARM_LIMIT) * 100 >= 91 ? "28px" : 0,
          borderBottomRightRadius:
            (currentDate / FARM_LIMIT) * 100 >= 91 ? "28px" : 0,
        }}
        className="progress"
      ></div>
      <p className="farming">
        Farming {Math.trunc((currentDate / FARM_LIMIT) * userInfo?.earnedCoins)}
      </p>
      <p className="time">
        {currentDate / FARM_LIMIT < 1
          ? `${new Date(FARM_LIMIT - currentDate).getHours() - 3}h ${new Date(
              FARM_LIMIT - currentDate
            ).getMinutes()}m
        ${new Date(FARM_LIMIT - currentDate).getSeconds()}s`
          : "Collect"}
      </p>
    </div>
  );
}
