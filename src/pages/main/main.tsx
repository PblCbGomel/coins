import { CoinsInfo } from "./coins";
import { ProfileInfo } from "./profile-info";
import "./main.css";
import { ProgressBar } from "./progress";

export function MainPage() {
  return (
    <div className="main-page-wrapper">
      <ProfileInfo />
      <CoinsInfo />
      <div className="main-info">
        <div className="game">
          <div className="ticket-info">
            <p className="ticket-header">Your tickets</p>
            <div className="tickets-count">
              <img
                alt="ticket"
                src="./icons/ticket.png"
                width={19}
                height={13}
              />
              <p>27</p>
            </div>
          </div>
          <button className="game-btn">Play!</button>
        </div>
        <ProgressBar />
      </div>
    </div>
  );
}
