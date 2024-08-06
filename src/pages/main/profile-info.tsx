import { NavLink } from "react-router-dom";
import { tg } from "../../App";
import { Avatar } from "../../components/avatar/avatar";
import { UserInfo } from "../../interfaces/user";

export function ProfileInfo({ userInfo }: { userInfo: UserInfo | undefined }) {
  return (
    <div className="profile-info">
      <div className="profile-tg-info">
        <Avatar size="66px" name={userInfo?.name || "username"} />
        <div className="profile-text">
          <div className="nickname">{userInfo?.name || "username"}</div>
          <div className="id">id{userInfo?.tgId || "123456789"}</div>
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
