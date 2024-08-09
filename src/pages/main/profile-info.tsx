import { NavLink } from "react-router-dom";
import { UserContext, tg } from "../../App";
import { Avatar } from "../../components/avatar/avatar";
import { useContext } from "react";

export function ProfileInfo() {
  const { user, notifText } = useContext(UserContext);
  return (
    <div className="profile-info">
      <div className="profile-tg-info">
        <Avatar size="66px" name={user?.name || "username"} />
        <div className="profile-text">
          <div className="nickname">
            {tg?.initDataUnsafe?.user?.username || "username"}
          </div>
          <div className="id">
            id {tg?.initDataUnsafe?.user?.id || "123456789"}{" "}
            <img
              src="../icons/copy.svg"
              onClick={() => {
                notifText("Your id has been copied");
                navigator.clipboard.writeText(
                  tg?.initDataUnsafe?.user?.id || "123456789"
                );
              }}
            />
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
