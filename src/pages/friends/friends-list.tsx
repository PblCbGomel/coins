import { useContext, useEffect, useState } from "react";
import { FriendCard } from "./friend-card";
import "./friends.css";
import { ModalButtons } from "./modal-buttons";
import { GetFetch, PatchFetch } from "../../functions/fetch";
import { UserContext, tg } from "../../App";
import { UserInfo } from "../../interfaces/user";
import { REF_LIMIT } from "../../constants/time-limit";

export function FriendsListPage() {
  const [leftFrinedsCount, setLeftFriendsCount] = useState(10);
  const [isModalButtonsOpened, setIsModalButtonsOpened] = useState(false);
  const [friends, setFriends] = useState<UserInfo[] | undefined>([]);
  const { user, setUser, changeCoinNotif } = useContext(UserContext);
  const [currentDate, setCurrentDate] = useState(
    new Date().getTime() -
      new Date(user?.lastRefClaim || "").getTime() +
      new Date().getTimezoneOffset() * 60000
  );

  useEffect(() => {
    GetFetch({
      path: "/api/getReferrals",
      query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
    }).then((result) => {
      setFriends(result);
    });
    GetFetch({
      path: "/api/user",
      query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
    }).then((result) => {
      setUser(result);
      if (result?.lastRefClaim) {
        setCurrentDate(
          new Date().getTime() -
            new Date(result?.lastRefClaim || "").getTime() +
            new Date().getTimezoneOffset() * 60000 +
            1000
        );
      } else {
        setCurrentDate(REF_LIMIT);
      }
    });
    const interval = setInterval(() => {
      GetFetch({
        path: "/api/getReferrals",
        query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
      }).then((result) => {
        setFriends(result);
      });
      GetFetch({
        path: "/api/user",
        query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
      }).then((result) => {
        setUser(result);
        if (result?.lastRefClaim) {
          setCurrentDate(
            new Date().getTime() -
              new Date(result?.lastRefClaim || "").getTime() +
              new Date().getTimezoneOffset() * 60000 +
              1000
          );
        } else {
          setCurrentDate(REF_LIMIT);
        }
      });
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [leftFrinedsCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.lastRefClaim) {
        setCurrentDate(
          new Date().getTime() -
            new Date(user?.lastRefClaim || "").getTime() +
            new Date().getTimezoneOffset() * 60000 +
            1000
        );
      } else {
        setCurrentDate(REF_LIMIT);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [user]);

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
                <img
                  src="../icons/coin-main.png"
                  alt="coin"
                  width={34}
                  height={34}
                />
              </div>
              <p>{user?.coinsFromRefs}</p>
            </div>
            <div className="friends-coins-text">
              Score 10% from buddies +2.5% from their referrals
            </div>
            <button
              className="friends-claim-btn"
              onClick={() => {
                if (REF_LIMIT - currentDate <= 0) {
                  PatchFetch({
                    path: "/api/claimRefCoins",
                    query: { id: tg?.initDataUnsafe?.user?.id || "123456789" },
                  }).then(() => {
                    GetFetch({
                      path: "/api/user",
                      query: {
                        id: tg?.initDataUnsafe?.user?.id || "123456789",
                      },
                    }).then((result) => {
                      setUser(result);
                      changeCoinNotif();
                      if (result?.lastRefClaim) {
                        setCurrentDate(
                          new Date().getTime() -
                            new Date(result?.lastRefClaim || "").getTime() +
                            new Date().getTimezoneOffset() * 60000 +
                            1000
                        );
                      }
                    });
                  });
                }
              }}
              style={
                currentDate / REF_LIMIT >= 1
                  ? {
                      backgroundColor: "#DC7B4E",
                      width: "78px",
                    }
                  : {}
              }
            >
              {" "}
              {currentDate / REF_LIMIT < 1
                ? `Claim in ${
                    new Date(REF_LIMIT - currentDate).getHours() +
                    new Date().getTimezoneOffset() / 60
                  }h ${new Date(
                    Math.ceil((REF_LIMIT - currentDate) / 60000) * 60000 + 1000
                  ).getMinutes()}m`
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
            Invite a friend ({leftFrinedsCount - (user?.refCount || 0)} left)
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
