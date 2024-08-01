import { NavLink } from "react-router-dom";
import { tg } from "../../App";
import { useEffect, useState } from "react";
import { getPhotoFile, getUserPhotos } from "../../functions/get-photo";

export function ProfileInfo() {
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    getUserPhotos({ user_id: tg?.initDataUnsafe?.user?.id })
      .then((response) => response.json())
      .then((response) => {
        setImage(response.ok);
        getPhotoFile({ file_id: response.result.photos[0].file_id })
          .then((response) => response.json())
          .then(
            (response) => {}
            // setImage(
            //   `https://api.telegram.org/file/bot${process.env.REACT_APP_BOT_TOKEN}${response.result.file_id}`
            // )
          );
      })
      .catch((err) => {
        setImage(err);
      });
  });

  return (
    <div className="profile-info">
      <div>{image}</div>
      <div className="profile-tg-info">
        <img
          src={"./drafts/photo-main.svg"}
          width={66}
          height={66}
          className="image"
        />
        <div className="profile-text">
          <div className="nickname">
            {tg?.initDataUnsafe?.user?.username || ""}
          </div>
          <div className="id">{tg?.initDataUnsafe?.user?.id || ""}</div>
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
