import InternalLink from './InternalLink';

export default function Header() {
  return (
    <header>
      <nav className="mx-auto flex items-center p-4 max-w-screen-lg">
        <h4 className="font-display flex-grow text-right">
          <InternalLink href="/">
            <span className="cursor-pointer text-pink-600">
              Rest this Afternoon <span>⛅</span>
            </span>
          </InternalLink>
        </h4>
      </nav>
    </header>
  );
}
