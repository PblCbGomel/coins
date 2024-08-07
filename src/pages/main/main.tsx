import { CoinsInfo } from "./coins";
import { ProfileInfo } from "./profile-info";
import "./main.css";
import { ProgressBar } from "./progress";
import { ModalButtons } from "../friends/modal-buttons";
import { useEffect, useState } from "react";
import { tg } from "../../App";
import { GetFetch } from "../../functions/fetch";
import { UserInfo } from "../../interfaces/user";
import { CoinNotification } from "../../components/coin-notification/coin-notification";

export function MainPage() {
  const [isModalButtonsOpened, setIsModalButtonsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

  useEffect(() => {
    GetFetch({
      path: "/api/user",
      query: { id: tg?.initDataUnsafe?.user?.id || "973750295" },
    }).then((result) => {
      setUserInfo(result);
    });
  }, [isModalButtonsOpened]);

  useEffect(() => {
    const getUserInfoTime = setInterval(() => {
      GetFetch({
        path: "/api/user",
        query: { id: tg?.initDataUnsafe?.user?.id || "973750295" },
      }).then((result) => {
        setUserInfo(result);
      });
    }, 1000);
    return () => {
      clearInterval(getUserInfoTime);
    };
  });

  return (
    <div className="main-page-wrapper">
      <div className="main-header">
        <ProfileInfo />
        <CoinsInfo userInfo={userInfo} />
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
        <ProgressBar userInfo={userInfo} />
        <ModalButtons
          setIsModalButtonsOpened={setIsModalButtonsOpened}
          isModalButtonsOpened={isModalButtonsOpened}
          userInfo={userInfo}
        />
      </div>
    </div>
  );
}
