import { CoinsInfo } from "./coins";
import { ProfileInfo } from "./profile-info";
import "./main.css";
import { ProgressBar } from "./progress";
import { ModalButtons } from "../friends/modal-buttons";
import { useContext, useEffect, useState } from "react";
import { UserContext, tg } from "../../App";
import { GetFetch } from "../../functions/fetch";

export function MainPage() {
  const [isModalButtonsOpened, setIsModalButtonsOpened] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    GetFetch({
      path: "/api/user",
      query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
    }).then((result) => {
      setUser(result);
    });
  }, [isModalButtonsOpened]);

  return (
    <div className="main-page-wrapper">
      <div className="main-header">
        <ProfileInfo />
        <CoinsInfo />
      </div>
      <div className="main-info">
        {/* <div className="game">
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
                {userInfo?.tickets || 0}
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
        </div> */}
        <ProgressBar />
        <ModalButtons
          setIsModalButtonsOpened={setIsModalButtonsOpened}
          isModalButtonsOpened={isModalButtonsOpened}
        />
      </div>
    </div>
  );
}
