import { useContext } from "react";
import "./main.css";
import { UserContext } from "../../App";

export function CoinsInfo() {
  const { user } = useContext(UserContext);
  return (
    <div className="coins-wrapper">
      <img alt="coin" src="./icons/coin-main.png" width={36} height={36} />{" "}
      <p className="coins-count">{user?.coins}</p>
    </div>
  );
}
