export default function ExternalLink({ href, children }) {
  return (
    <a className="no-underline" href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}
