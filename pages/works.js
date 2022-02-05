import Layout from '../components/Layout';
import ExternalLink from '../components/ExternalLink';

const Works = ({ title }) => {
  return (
    <Layout pageTitle={title}>
      <div className="mx-auto max-w-screen-md px-4">
        <h6 className="py-4 font-bold">Public works</h6>

        <p className="py-2">I&apos;m currently building:</p>

        <ul className="py-2 list-disc">
          <li className="ml-4 pl-2">
            <ExternalLink href="https://buildtorent.io/">
              Property database site
            </ExternalLink>
          </li>
        </ul>

        <p className="py-2">Other (mostly fun) stuff I&#39;ve done:</p>

        <ul className="py-2 list-disc">
          <li className="list-item-interactive ml-4 pl-2">
            <ExternalLink href="https://super-app-20.restthisafternoon.com/">
              Invert binary tree
            </ExternalLink>
          </li>
          <li className="list-item-interactive ml-4 pl-2">
            <ExternalLink href="https://string-versus.restthisafternoon.com/">
              String versus
            </ExternalLink>
          </li>
          <li className="list-item-interactive ml-4 pl-2">
            <ExternalLink href="https://repl-chat.restthisafternoon.com/">
              blog.repl.it chat client
            </ExternalLink>
          </li>
          <li className="list-item-interactive ml-4 pl-2">More to come...</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Works;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  return {
    props: {
      title: configData.default.title,
    },
  };
}
