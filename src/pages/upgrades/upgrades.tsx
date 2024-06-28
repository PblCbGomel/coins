import { upgradesCards } from "../../constants/upgrade-cards";
import { UpgradeCard } from "./card";
import "./upgrade.css";

export function UpgradesPage() {
  return (
    <div className="upgrade-wrapper">
      <div className="upgrade-header">
        <div className="logo">
          <img src="./icons/upgrade.png" width={36} height={36} />
          <h2>Upgrade</h2>
        </div>
        <div className="coins">
          <img src="./icons/coin-main.png" width={36} height={36} />
          <p>18,778</p>
        </div>
      </div>
      <div className="upgrade-list">
        {upgradesCards.map((card) => {
          return <UpgradeCard {...card} />;
        })}
      </div>
    </div>
  );
}
