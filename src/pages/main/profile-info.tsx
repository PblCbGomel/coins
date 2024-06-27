export function ProfileInfo() {
  return (
    <div className="profile-info">
      <img
        src="./drafts/photo-main.png"
        width={66}
        height={66}
        className="image"
      />
      <div className="nickname">Иван Алексеев</div>
      <button className="change-theme-btn">
        <img alt="moon" src="./buttons/moon.png" width={20} height={20} />
      </button>
    </div>
  );
}
