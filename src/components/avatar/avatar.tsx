import "./avatar.css";

export function Avatar({ size, name }: { size: string; name: string }) {
  return (
    <div style={{ width: size, height: size }} className="avatar">
      {name.split("")[0].toUpperCase()}
    </div>
  );
}
