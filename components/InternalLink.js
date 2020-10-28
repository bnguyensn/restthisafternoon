import NextLink from 'next/link';

export default function InternalLink({ href, children }) {
  return (
    <NextLink href={href}>
      <a className="no-underline">{children}</a>
    </NextLink>
  );
}
