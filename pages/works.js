import Layout from '../components/Layout';
import ExternalLink from '../components/ExternalLink';

const Works = ({ title, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <div className="mx-auto max-w-screen-md px-4">
        <h6 className="py-4 font-bold">Public works</h6>

        <p className="py-2">Some of the stuff I&#39;ve done:</p>

        <ul className="py-2 list-disc">
          <li className="ml-4 pl-2">
            <ExternalLink href="https://super-app-18.restthisafternoon.com/">
              Super app #18
            </ExternalLink>
          </li>
          <li className="ml-4 pl-2">More to come...</li>
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