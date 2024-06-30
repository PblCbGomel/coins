import "./friends.css";

export interface Friend {
  avatar: string;
  nickname: string;
  coins: string;
}

export function FriendCard({ avatar, nickname, coins }: Friend) {
  return (
    <div className="friend-card">
      <div className="friend-info">
        <img className="friend-avatar" src={avatar} width={41} height={41} />
        <div className="text-info">
          <h4>{nickname}</h4>
          <p>
            <img src="./navigation/friends.svg" width={9} height={9} /> +25
          </p>
        </div>
      </div>
      <div className="friend-card-coins">
        {coins} <img src="./icons/coin-main.png" width={20} height={20} />
      </div>
    </div>
  );
}
