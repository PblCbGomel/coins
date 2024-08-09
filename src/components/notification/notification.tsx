import "./notification.css";

export function Notification({ text }: { text: string }) {
  return (
    <div className={`notification`}>
      <img src="../icons/notif.svg" />
      {text}
    </div>
  );
}
