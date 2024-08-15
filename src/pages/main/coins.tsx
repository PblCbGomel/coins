import { useContext } from "react";
import "./main.css";
import { UserContext } from "../../App";
import { Loading } from "../../components/loading/loading";

export function CoinsInfo() {
  const { user } = useContext(UserContext);
  return (
    <div className="coins-wrapper">
      <img alt="coin" src="./icons/coin-main.png" width={36} height={36} />{" "}
      <p className="coins-count">
        {user?.coins ? user.coins : <Loading size="26px" />}
      </p>
    </div>
  );
}
