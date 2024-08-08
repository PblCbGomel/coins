import { Avatar } from "../../components/avatar/avatar";
import "./friends.css";

export interface Friend {
  nickname: string;
  coins: number | string;
  refCount: number;
}

export function FriendCard({ nickname, coins, refCount }: Friend) {
  return (
    <div className="friend-card">
      <div className="friend-info">
        <Avatar name={nickname} size="41px" />
        <div className="text-info">
          <h4>{nickname}</h4>
          <p>
            <img src="../navigation/friends.svg" width={9} height={9} />{" "}
            {refCount}
          </p>
        </div>
      </div>
      <div className="friend-card-coins">
        {coins} <img src="../icons/coin-main.png" width={20} height={20} />
      </div>
    </div>
  );
}
