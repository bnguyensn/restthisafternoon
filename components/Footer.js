import ExternalLink from './ExternalLink';

export default function Footer() {
  return (
    <footer>
      <div className="py-4 px-2 text-center bg-gray-900 text-white">
        <p className="pb-2">
          Created with <span>❤️</span>{' '}
          <ExternalLink href="https://github.com/bnguyensn/restthisafternoon">
            (source code)
          </ExternalLink>
        </p>

        <p className="pb-2">
          Built using{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>
          {' and '}
          <ExternalLink href="https://tailwindcss.com">
            Tailwind CSS
          </ExternalLink>
          <span> 🛠️</span>
        </p>

        <p className="pb-2">
          Deployed by{' '}
          <ExternalLink href="https://tailwindcss.com">Netlify</ExternalLink>
          <span> 🚀</span>
        </p>

        <p>
          Fonts are{' '}
          <ExternalLink href="https://fonts.google.com/specimen/Quicksand">
            Quicksand
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://fonts.google.com/specimen/Bubblegum+Sans">
            Bubblegum Sans
          </ExternalLink>
          <span> ✨</span>
        </p>
      </div>
    </footer>
  );
}
