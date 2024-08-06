import "./avatar.css";

export function Avatar({ size, name }: { size: string; name: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        fontSize: `${Number(size.substring(0, 2)) / 2}px`,
      }}
      className="avatar"
    >
      {name.split("")[0].toUpperCase()}
    </div>
  );
}
