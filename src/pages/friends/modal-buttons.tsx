import { useNavigate } from "react-router-dom";
import "./modal.css";

export function ModalButtons({
  setIsModalButtonsOpened,
  isModalButtonsOpened,
}: {
  setIsModalButtonsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isModalButtonsOpened: boolean;
}) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`modal-wrapper ${
          isModalButtonsOpened && "modal-wrapper-active"
        }`}
      ></div>
      <div className="modal-btns-wrapper">
        <h4>Invite friends</h4>
        <button
          className="send-invite-btn"
          onClick={() => {
            setIsModalButtonsOpened(false);
            navigate("/friends/list");
          }}
        >
          <img src={"./icons/send.png"} width={13} height={12} alt="send" />
          <p>Send invite</p>
        </button>
        <button
          className="copy-link-btn"
          onClick={() => {
            /* add clipboard functional */
          }}
        >
          <img src={"./icons/copy.png"} width={13} height={15} alt="copy" />
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
