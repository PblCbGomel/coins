import { useEffect, useState } from "react";
import { FriendCard } from "./friend-card";
import "./friends.css";
import { ModalButtons } from "./modal-buttons";
import { GetFetch, PatchFetch } from "../../functions/fetch";
import { tg } from "../../App";
import { UserInfo } from "../../interfaces/user";
import { REF_LIMIT } from "../../constants/time-limit";

export function FriendsListPage() {
  const [leftFrinedsCount, setLeftFriendsCount] = useState(10);
  const [isModalButtonsOpened, setIsModalButtonsOpened] = useState(false);
  const [friends, setFriends] = useState<UserInfo[] | undefined>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const [currentDate, setCurrentDate] = useState(
    new Date().getTime() - new Date(userInfo?.lastRefClaim || "").getTime()
  );
  const [notificationCoins, setNotificationCoins] = useState(0);

  useEffect(() => {
    setCurrentDate(
      new Date().getTime() - new Date(userInfo?.lastRefClaim || "").getTime()
    );
  }, [userInfo]);

  useEffect(() => {
    GetFetch({
      path: "/api/getReferrals",
      query: { id: userInfo?.tgId || "123456789" },
    }).then((result) => {
      setFriends(result);
    });
    GetFetch({
      path: "/api/user",
      query: { id: userInfo?.tgId || "123456789" },
    }).then((result) => {
      setUserInfo(result);
    });
    const interval = setInterval(() => {
      GetFetch({
        path: "/api/getReferrals",
        query: { id: userInfo?.tgId || "123456789" },
      }).then((result) => {
        setFriends(result);
      });
      GetFetch({
        path: "/api/user",
        query: { id: userInfo?.tgId || "123456789" },
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
          {Boolean(notificationCoins) && (
            <div className="notification-friend">
              <img src="../icons/notif.svg" />
              <p>You Got +{notificationCoins} Peak Points</p>
            </div>
          )}
          <div className="friends-coins-wrapper">
            <div className="friends-coins">
              <div className="friends-coins-ticket-wrapper">
                <img
                  src="../icons/coin-main.png"
                  alt="coin"
                  width={36}
                  height={36}
                />
              </div>
              <p>{userInfo?.coinsFromRefs}</p>
            </div>
            <div className="friends-coins-text">
              Score 10% from buddies +2.5% from their referrals Get a{" "}
              <img
                src="../icons/ticket.png"
                width={17}
                height={11}
                alt="ticket"
              />{" "}
              play pass for each frends
            </div>
            <button
              className="friends-claim-btn"
              onClick={() => {
                if (REF_LIMIT - currentDate <= 0) {
                  PatchFetch({
                    path: "/api/claimRefCoins",
                    query: { id: userInfo?.tgId || "123456789" },
                  }).then(() => {
                    GetFetch({
                      path: "/api/user",
                      query: {
                        id: userInfo?.tgId || "123456789",
                      },
                    }).then((result) => {
                      setNotificationCoins(userInfo?.coinsFromRefs || 0);
                      setUserInfo(result);
                    });
                  });
                }
              }}
              style={
                currentDate / REF_LIMIT >= 1
                  ? {
                      background:
                        "linear-gradient(90deg, #9F3F09 0%, #DC7B4E 100%)",
                      color: "white",
                      width: "80px",
                    }
                  : {}
              }
            >
              {" "}
              {currentDate / REF_LIMIT < 1
                ? `Claim in ${
                    new Date(REF_LIMIT - currentDate).getHours() - 3
                  }h ${new Date(REF_LIMIT - currentDate).getMinutes()}m`
                : "Claim"}
            </button>
          </div>

          <div className="friends-count-header">
            <h3>{friends?.length} friends</h3>
          </div>
          {friends?.map((friend, i) => {
            return (
              <FriendCard
                key={friend.tgId}
                nickname={friend.name}
                coins={friend.coins}
                refCount={friend.refCount}
              />
            );
          })}
        </div>
        <div className="invite-btn-wrapper">
          <button
            className="invite-friend-btn"
            onClick={() => {
              setIsModalButtonsOpened(true);
            }}
          >
            Invite a friend ({leftFrinedsCount - (userInfo?.refCount || 0)}{" "}
            left)
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
