import { useEffect, useState } from "react";
import "./main.css";
import { GetFetch } from "../../functions/fetch";
import { tg } from "../../App";
import { UserInfo } from "../../interfaces/user";

export function CoinsInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

  useEffect(() => {
    GetFetch({
      path: "/api/user",
      query: tg?.initDataUnsafe?.user?.id || "123456789",
    }).then((result) => {
      setUserInfo(result.data);
    });
  });
  return (
    <div className="coins-wrapper">
      <img alt="coin" src="./icons/coin-main.png" width={36} height={36} />{" "}
      <p className="coins-count">{userInfo?.coins}</p>
    </div>
  );
}
