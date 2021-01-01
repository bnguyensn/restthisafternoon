import { useState } from 'react';

import InternalLink from './InternalLink';
import IconButton from './IconButton';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuBtnClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <nav className="mx-auto p-4 max-w-screen-lg">
        <ul className="w-full flex items-center justify-center">
          <li className="md:hidden mx-2">
            <IconButton
              className="w-8 h-8"
              handleAction={handleMenuBtnClick}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <CloseIcon fill="#db2778" />
              ) : (
                <MenuIcon fill="#db2778" />
              )}
            </IconButton>
          </li>
          <li className="hidden md:block mx-2 text-center">
            <InternalLink href="/works">Works</InternalLink>
          </li>
          <li className="hidden md:block mx-2 text-center">
            <InternalLink href="/writings">Writings</InternalLink>
          </li>
          <li className="font-display flex-grow text-right">
            <InternalLink href="/">
              <span className="cursor-pointer text-pink-600 text-3xl">
                Rest this Afternoon <span>⛅</span>
              </span>
            </InternalLink>
          </li>
        </ul>
      </nav>

      <nav
        className={`${
          !menuOpen ? 'hidden' : ''
        } md:hidden fixed left-6 top-16 py-2 px-4 bg-white border border-pink-600 rounded`}
      >
        <ul className="flex flex-col">
          <li className="mb-2">
            <InternalLink href="/works">Works</InternalLink>
          </li>
          <li>
            <InternalLink href="/writings">Writings</InternalLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
