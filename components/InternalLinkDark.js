import NextLink from 'next/link';

export default function InternalLinkDark({ href, children }) {
  return (
    <NextLink
      href={href}
      className="no-underline text-blue-300 hover:text-blue-500"
    >
      {children}
    </NextLink>
  );
}
