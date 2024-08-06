import { NavLink } from "react-router-dom";
import { tg } from "../../App";
import { Avatar } from "../../components/avatar/avatar";

export function ProfileInfo() {
  return (
    <div className="profile-info">
      {tg}
      <div className="profile-tg-info">
        <Avatar
          size="66px"
          name={tg?.initDataUnsafe?.user?.username || "username"}
        />
        <div className="profile-text">
          <div className="nickname">
            {tg?.initDataUnsafe?.user?.username || "username"}
          </div>
          <div className="id">
            id{tg?.initDataUnsafe?.user?.id || "123456789"}
          </div>
        </div>
      </div>
      <NavLink className="change-theme-btn" to={"/friends"}>
        <img
          className="add-friend"
          alt="friend"
          src="./navigation/friends.svg"
          width={16}
          height={16}
        />
      </NavLink>
    </div>
  );
}
