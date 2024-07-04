import { roadItems } from "../../constants/road-items";
import { RoadItem } from "./road-item";
import "./road.css";

export function RoadPage() {
  return (
    <div className="road-wrapper">
      <div className="road-header">
        <div className="road-logo">
          <h2>Roadmap</h2>
        </div>
      </div>
      <figure className="road-img">
        <img src="./drafts/road-img.png" width={106} height={106} alt="road" />
        <figcaption>
          Get ready! <br /> Airdrop is coming soon!
        </figcaption>
      </figure>
      <div className="road-list">
        {roadItems.map((item) => {
          return <RoadItem {...item} />;
        })}
      </div>
    </div>
  );
}
