export function Loading({ size }: { size: string }) {
  return (
    <img
      width={size}
      height={size}
      alt="loading"
      src="../icons/loading.gif"
    ></img>
  );
}
