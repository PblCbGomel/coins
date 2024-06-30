import { CoinsInfo } from "./coins";
import { ProfileInfo } from "./profile-info";
import "./main.css";
import { ProgressBar } from "./progress";
import { NavLink } from "react-router-dom";

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
          <NavLink className="game-btn" to={"/friends"}>
            Invite for <img src="./icons/ticket.svg" />
          </NavLink>
        </div>
        <ProgressBar />
      </div>
    </div>
  );
}
