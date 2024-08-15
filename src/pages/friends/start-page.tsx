import "./start-page.css";

export function FriendsStartPage() {
  return (
    <div className="start-page-wrapper">
      <p className="start-page-text">
        You can earn more coins if you invite your friends!
      </p>
      <div className="start-page-cards-wrapper">
        <div className="start-page-card">
          <h3>+10%</h3>
          <p>From your buddies</p>
        </div>
        <div className="start-page-card">
          <h3>+2,5%</h3>
          <p>From their referrals</p>
        </div>
      </div>
      <h4 className="start-page-how-header">How it works?</h4>
      <div className="start-page-how-wrapper">
        <div>
          <h5>Share your invitation link</h5>
          <p className="start-page-how-text">Get a +50PP for every friend</p>
        </div>
        <div className="start-page-how-border"></div>
        <div>
          <h5>Your friends join Coinfarm</h5>
          <p className="start-page-how-text">And start farming coins</p>
        </div>
        <div className="start-page-how-border"></div>
        <div>
          <h5>Score 10% from buddies</h5>
          <p className="start-page-how-text">
            Plus an extra 2.5% from their referrals
          </p>
        </div>
      </div>
    </div>
  );
}
