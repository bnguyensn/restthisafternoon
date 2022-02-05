import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, pageTitle, keywords }) {
  const baseKw = `bnguyensn, blog, personal`;
  const kw = keywords ? `${baseKw}, ${keywords}` : baseKw;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>{pageTitle}</title>
        <meta name="description" content="Musings about life" />
        <meta name="keywords" content={kw} />
        <meta name="author" content="Binh Nguyen" />
      </Head>

      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
