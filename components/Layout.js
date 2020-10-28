import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>{pageTitle}</title>
        <meta name="description" content="Musings about life" />
        <meta name="keywords" content="bnguyensn, blog, personal" />
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
