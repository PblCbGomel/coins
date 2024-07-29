import { NavLink } from "react-router-dom";
import { tg } from "../../App";

export function ProfileInfo() {
  return (
    <div className="profile-info">
      <div className="profile-tg-info">
        <img
          src="./drafts/photo-main.svg"
          width={66}
          height={66}
          className="image"
        />
        <div className="profile-text">
          <div className="nickname">Иван Алексеев</div>
          <div className="id">{tg.initDataUnsafe.user.id}</div>
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
