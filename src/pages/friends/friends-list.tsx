import { useEffect, useState } from 'react';
import { FriendCard } from './friend-card';
import { friendCards } from '../../constants/friend-cards';
import './friends.css';
import { ModalButtons } from './modal-buttons';
import { GetFetch, PatchFetch } from '../../functions/fetch';
import { tg } from '../../App';
import { UserInfo } from '../../interfaces/user';

const LIMIT = 28800000;

export function FriendsListPage() {
  const [frinedsCount, setFriendsCount] = useState(6);
  const [leftFrinedsCount, setLeftFriendsCount] = useState(10);
  const [isModalButtonsOpened, setIsModalButtonsOpened] = useState(false);
  const [friends, setFriends] = useState<UserInfo[] | undefined>();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const [currentDate, setCurrentDate] = useState(
    new Date().getTime() - new Date(userInfo?.lastRefClaim || '').getTime()
  );

  useEffect(() => {
    setCurrentDate(new Date().getTime() - new Date(userInfo?.lastRefClaim || '').getTime());
  }, [userInfo]);

  useEffect(() => {
    GetFetch({ path: '/api/getReferrals', query: { id: tg?.initDataUnsafe?.user?.id || '123456789' } }).then(
      (result) => {
        setFriends(result);
      }
    );
    GetFetch({
      path: '/api/user',
      query: { id: tg?.initDataUnsafe?.user?.id || '123456789' }
    }).then((result) => {
      setUserInfo(result);
    });
    const interval = setInterval(() => {
      GetFetch({ path: '/api/getReferrals', query: { id: tg?.initDataUnsafe?.user?.id || '123456789' } }).then(
        (result) => {
          setFriends(result);
        }
      );
      GetFetch({
        path: '/api/user',
        query: { id: tg?.initDataUnsafe?.user?.id || '123456789' }
      }).then((result) => {
        setUserInfo(result);
      });
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [leftFrinedsCount]);

  return (
    <>
      <div className="friend-wrapper">
        <div className="friends-list-wrapper">
          <div className="friends-header">
            <h2>Your Friends</h2>
          </div>
          <div className="friends-coins-wrapper">
            <div className="friends-coins">
              <div className="friends-coins-ticket-wrapper">
                <img src="../icons/coin-main.png" alt="coin" width={36} height={36} />
              </div>
              <p>{userInfo?.coinsFromRefs}</p>
            </div>
            <div className="friends-coins-text">
              Score 10% from buddies +2.5% from their referrals Get a{' '}
              <img src="../icons/ticket.png" width={17} height={11} alt="ticket" /> play pass for each frends
            </div>
            <button
              className="friends-claim-btn"
              onClick={() => {
                if (LIMIT - currentDate <= 0) {
                  PatchFetch({
                    path: '/api/claimRefCoins',
                    query: { id: tg?.initDataUnsafe?.user?.id || '123456789' }
                  }).then(() => {
                    GetFetch({
                      path: '/api/user',
                      query: { id: tg?.initDataUnsafe?.user?.id || '123456789' }
                    }).then((result) => {
                      setUserInfo(result);
                    });
                  });
                }
              }}
            >
              {' '}
              {currentDate / LIMIT < 1
                ? `Claim in ${new Date(LIMIT - currentDate).getHours() - 3}h ${new Date(
                    LIMIT - currentDate
                  ).getMinutes()}m`
                : 'CLAIM'}
            </button>
          </div>

          <div className="friends-count-header">
            <h3>{frinedsCount} friends</h3>
          </div>
          {friends?.map((friend, i) => {
            return <FriendCard key={friend.tgId} avatar={''} nickname={friend.tgId} coins={friend.coins} />;
          })}
        </div>
        <div className="invite-btn-wrapper">
          <button
            className="invite-friend-btn"
            onClick={() => {
              setIsModalButtonsOpened(true);
            }}
          >
            Invite a friend ({leftFrinedsCount} left)
          </button>
        </div>
      </div>
      <ModalButtons setIsModalButtonsOpened={setIsModalButtonsOpened} isModalButtonsOpened={isModalButtonsOpened} />
    </>
  );
}
