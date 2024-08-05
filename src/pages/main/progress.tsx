import { useEffect, useState } from "react";
import "./main.css";
import { GetFetch, PatchFetch } from "../../functions/fetch";
import { tg } from "../../App";
import { UserInfo } from "../../interfaces/user";

export function ProgressBar() {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const [currentDate, setCurrentDate] = useState(
    new Date().getTime() - new Date(userInfo?.lastFarmStart || "").getTime()
  );

  useEffect(() => {
    GetFetch({
      path: "/api/user",
      query: tg?.initDataUnsafe?.user?.id || "123456789",
    }).then((result) => {
      setUserInfo(result.data);
    });

    const getUserInfoTime = setInterval(() => {
      GetFetch({
        path: "/api/user",
        query: tg?.initDataUnsafe?.user?.id || "123456789",
      }).then((result) => {
        setUserInfo(result.data);
      });
    }, 1000);

    return () => {
      clearInterval(getUserInfoTime);
    };
  });

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
            query: tg?.initDataUnsafe?.user?.id || "123456789",
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
        if (currentDate > 0) {
          PatchFetch({
            path: "/api/collect",
            query: tg?.initDataUnsafe?.user?.id || "123456789",
          });
        }
      }}
    >
      <div
        style={{ width: `${(currentDate / 28800) * 100}%` }}
        className="progress"
      ></div>
      <p className="farming">Farming {userInfo?.earnedCoins}</p>
      <p className="time">
        {`${new Date(currentDate).getHours()}h`}{" "}
        {`${new Date(currentDate).getMinutes()}m`}{" "}
        {`${new Date(currentDate).getSeconds()}s`}
      </p>
    </div>
  );
}
