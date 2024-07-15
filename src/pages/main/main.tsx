import { CoinsInfo } from "./coins";
import { ProfileInfo } from "./profile-info";
import "./main.css";
import { ProgressBar } from "./progress";
import { NavLink } from "react-router-dom";
import { ModalButtons } from "../friends/modal-buttons";
import { useState } from "react";

export function MainPage() {
  const [isModalButtonsOpened, setIsModalButtonsOpened] = useState(false);

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
              <p>
                <img
                  src="../icons/ticket.png"
                  width={17}
                  height={11}
                  alt="ticket"
                />{" "}
                27
              </p>
            </div>
          </div>
          <button
            className="game-btn"
            onClick={() => {
              setIsModalButtonsOpened(true);
            }}
          >
            Invite for{" "}
            <img
              src="../icons/ticket.png"
              width={17}
              height={11}
              alt="ticket"
            />
          </button>
        </div>
        <ProgressBar />
        <ModalButtons
          setIsModalButtonsOpened={setIsModalButtonsOpened}
          isModalButtonsOpened={isModalButtonsOpened}
        />
      </div>
    </div>
  );
}
