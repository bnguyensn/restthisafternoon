import NextLink from 'next/link';
import { clsx } from 'clsx';

export default function InternalLink({ href, isActive, children }) {
  return (
    <NextLink
      href={href}
      className={clsx(isActive && 'font-bold', 'no-underline')}
    >
      {children}
    </NextLink>
  );
}
