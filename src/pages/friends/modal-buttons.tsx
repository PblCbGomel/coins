import "./modal.css";
import { UserContext, tg } from "../../App";
import { useContext } from "react";

export function ModalButtons({
  setIsModalButtonsOpened,
  isModalButtonsOpened,
}: {
  setIsModalButtonsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isModalButtonsOpened: boolean;
}) {
  const { user, notifText } = useContext(UserContext);

  return (
    <>
      <div
        className={`modal-wrapper ${
          isModalButtonsOpened && "modal-wrapper-active"
        }`}
        onClick={() => {
          setIsModalButtonsOpened(false);
        }}
      ></div>
      <div className="modal-btns-wrapper">
        <h4>Invite friends</h4>
        <button
          className="send-invite-btn"
          onClick={() => {
            navigator.share({
              title: "Share referral link",
              text: "Share referral link",
              url: `https://t.me/coinstest1123bot?start=${
                user?.tgId || "123456789"
              }`,
            });
          }}
        >
          <img src={"../icons/send.png"} width={13} height={12} alt="send" />
          <p>Send invite</p>
        </button>
        <button
          className="copy-link-btn"
          onClick={() => {
            notifText("Referral link copied");
            navigator.clipboard.writeText(
              `https://t.me/coinstest1123bot?start=${
                tg?.initDataUnsafe?.user?.id || "123456789"
              }`
            );
          }}
        >
          <img src={"../icons/copy.png"} width={13} height={15} alt="copy" />
          <p>Copy link</p>
        </button>
        <button
          className="close-btn"
          onClick={() => {
            setIsModalButtonsOpened(false);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
