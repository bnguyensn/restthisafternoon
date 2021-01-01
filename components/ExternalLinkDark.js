export default function ExternalLinkDark({ href, children }) {
  return (
    <a
      className="no-underline text-blue-300 hover:text-blue-500"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
