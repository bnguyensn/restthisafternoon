import ExternalLinkDark from './ExternalLinkDark';

export default function Footer() {
  return (
    <footer>
      <div className="py-4 px-2 text-center bg-gray-900 text-white text-sm">
        <p className="pb-2">
          Made with <span>❤️</span>{' '}
          <ExternalLinkDark href="https://github.com/bnguyensn/restthisafternoon">
            (source code)
          </ExternalLinkDark>
        </p>

        <p className="pb-2">
          Built using{' '}
          <ExternalLinkDark href="https://nextjs.org">Next.js</ExternalLinkDark>
          {' and '}
          <ExternalLinkDark href="https://tailwindcss.com">
            Tailwind CSS
          </ExternalLinkDark>
          <span> 🛠️</span>
        </p>

        <p className="pb-2">
          Deployed by{' '}
          <ExternalLinkDark href="https://vercel.com">Vercel</ExternalLinkDark>
          <span> 🚀</span>
        </p>

        <p className="pb-2">
          Fonts are{' '}
          <ExternalLinkDark href="https://fonts.google.com/specimen/Quicksand">
            Quicksand
          </ExternalLinkDark>{' '}
          and{' '}
          <ExternalLinkDark href="https://fonts.google.com/specimen/Bubblegum+Sans">
            Bubblegum Sans
          </ExternalLinkDark>
          <span> ✨</span>
        </p>

        <p>2020 - 2025</p>
      </div>
    </footer>
  );
}
