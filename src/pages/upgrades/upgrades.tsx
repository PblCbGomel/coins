import { upgradesCards } from "../../constants/upgrade-cards";
import { UpgradeCard } from "./card";
import "./upgrade.css";

export function UpgradesPage() {
  return (
    <div className="upgrade-wrapper">
      <div className="upgrade-header">
        <div className="logo">
          <h2>Upgrade</h2>
        </div>
        <div className="coins">
          <img src="./icons/coin-main.png" width={28} height={28} />
          <p>18,778</p>
        </div>
      </div>
      <p className="upgrade-info">
        To speed up the accumulation of coins, you can improve your mining
        characteristics
      </p>
      <div className="upgrade-list">
        {upgradesCards.map((card) => {
          return <UpgradeCard key={card.headerMainText} {...card} />;
        })}
        <div className="empty-div"></div>
      </div>
    </div>
  );
}
