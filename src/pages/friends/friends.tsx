import { useState } from "react";
import { friendCards } from "../../constants/friend-cards";
import "./friends.css";
import { FriendCard } from "./friend-card";

export function FriendsPage() {
  const [frinedsCount, setFriendsCount] = useState(6);
  const [leftFrinedsCount, setLeftFriendsCount] = useState(10);

  return (
    <div className="friend-wrapper">
      <div className="friends-list-wrapper">
        <div className="friends-header">
          <h2>Your Friends</h2>
        </div>
        <div className="friends-coins-wrapper">
          <div className="friends-coins">
            <img src="./icons/coin-main.png" width={36} height={36} />
            <p>1,241</p>
          </div>
          <div className="friends-coins-text">
            Score 10% from buddies +2.5% from their referrals Get a{" "}
            <img src="./icons/ticket.png" width={19} height={13} /> play pass
            for each frends
          </div>
          <button className="friends-claim-btn">Claim in 06h 55m</button>
        </div>

        <div className="friends-count-header">
          <h3>{frinedsCount} friends</h3>
        </div>
        {friendCards.map((friend) => {
          return <FriendCard key={friend.nickname} {...friend} />;
        })}
      </div>
      <div className="invite-btn-wrapper">
        <button className="invite-friend-btn">
          Invite a friend ({leftFrinedsCount} left)
        </button>
      </div>
    </div>
  );
}
