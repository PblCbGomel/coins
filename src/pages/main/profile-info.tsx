export function ProfileInfo() {
  return (
    <div className="profile-info">
      <img
        src="./drafts/photo-main.svg"
        width={66}
        height={66}
        className="image"
      />
      <div className="profile-text">
        <div className="nickname">Иван Алексеев</div>
        <div className="id">id 666444333</div>
      </div>
      <button
        className="change-theme-btn"
        onClick={() => {
          window.location.href = "/friends";
        }}
      >
        <img
          className="add-friend"
          alt="friend"
          src="./navigation/friends.svg"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
