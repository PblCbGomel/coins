import { useState } from "react";
import "./friends.css";
import { FriendsStartPage } from "./start-page";
import { ModalButtons } from "./modal-buttons";

export function FriendsPage() {
  const [frinedsCount, setFriendsCount] = useState(6);
  const [leftFrinedsCount, setLeftFriendsCount] = useState(10);
  const [isModalButtonsOpened, setIsModalButtonsOpened] = useState(false);

  return (
    <>
      <div className="friend-wrapper">
        <div className="friends-list-wrapper">
          <div className="friends-header">
            <h2>Your Friends</h2>
          </div>
          <FriendsStartPage />
        </div>
        <div className="invite-btn-wrapper">
          <button
            className="invite-friend-btn"
            onClick={() => {
              setIsModalButtonsOpened(!isModalButtonsOpened);
            }}
          >
            Invite a friend ({leftFrinedsCount} left)
          </button>
        </div>
      </div>
      <ModalButtons
        setIsModalButtonsOpened={setIsModalButtonsOpened}
        isModalButtonsOpened={isModalButtonsOpened}
      />
    </>
  );
}
