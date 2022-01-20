export default function StrikeMeLink({ username }) {
  return (
    <a href={`https://strike.me/${username}`} target="_blank" rel="noreferrer">
      {username}
    </a>
  );
}
