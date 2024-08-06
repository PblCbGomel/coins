import { useNavigate } from 'react-router-dom';
import './modal.css';
import { tg } from '../../App';
import { PatchFetch } from '../../functions/fetch';

export function ModalButtons({
  setIsModalButtonsOpened,
  isModalButtonsOpened
}: {
  setIsModalButtonsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isModalButtonsOpened: boolean;
}) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`modal-wrapper ${isModalButtonsOpened && 'modal-wrapper-active'}`}
        onClick={() => {
          setIsModalButtonsOpened(false);
        }}
      ></div>
      <div className="modal-btns-wrapper">
        <h4>Invite friends</h4>
        <button
          className="send-invite-btn"
          onClick={() => {
            setIsModalButtonsOpened(false);
            PatchFetch({
              path: '/api/reflink',
              query: { id: tg?.initDataUnsafe?.user?.id || '123456789' }
            });
            navigate('/friends/list');
          }}
        >
          <img src={'./icons/send.png'} width={13} height={12} alt="send" />
          <p>Send invite</p>
        </button>
        <button
          className="copy-link-btn"
          onClick={() => {
            navigator.clipboard.writeText(`https://t.me/botname?start=${tg?.initDataUnsafe?.user?.id || '123456789'}`);
          }}
        >
          <img src={'./icons/copy.png'} width={13} height={15} alt="copy" />
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
