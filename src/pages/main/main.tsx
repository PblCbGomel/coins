import { CoinsInfo } from "./coins";
import { ProfileInfo } from "./profile-info";
import "./main.css";
import { ProgressBar } from "./progress";

export function MainPage() {
  return (
    <div className="main-page-wrapper">
      <div className="main-header">
        <ProfileInfo />
        <CoinsInfo />
      </div>
      <div className="main-info">
        <div className="game">
          <div className="ticket-info">
            <p className="ticket-header">Your tickets</p>
            <div className="tickets-count">
              <img
                alt="ticket"
                src="./icons/ticket.svg"
                width={19}
                height={13}
              />
              <p>27</p>
            </div>
          </div>
          <button
            className="game-btn"
            onClick={() => {
              window.location.href = "/friends";
            }}
          >
            Invite for <img src="./icons/ticket.svg" />
          </button>
        </div>
        <ProgressBar />
      </div>
    </div>
  );
}
