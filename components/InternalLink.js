import NextLink from 'next/link';

export default function InternalLink({ href, children }) {
  return (
    <NextLink href={href} className="no-underline">
      {children}
    </NextLink>
  );
}
