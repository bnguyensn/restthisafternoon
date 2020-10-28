import Layout from '../components/Layout';
import InternalLink from '../components/InternalLink';
import ExternalLink from '../components/ExternalLink';

const Index = ({ posts, title, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <div className="mx-auto max-w-screen-md px-4">
        <div className="w-20 h-20">
          <img
            className="rounded shadow"
            src="/images/bnguyen.jpg"
            alt="Binh's photo"
            width={200}
            height={200}
          />
        </div>

        <h6 className="py-4">Hi 👋, I&#39;m Binh</h6>

        <p className="py-2">
          Thank you for dropping by. On this site you&#39;ll find:
        </p>

        <ul className="py-2 list-disc">
          <li className="ml-4 pl-2">
            <InternalLink href="/works">My public works</InternalLink>
          </li>
          <li className="ml-4 pl-2">
            <InternalLink href="/writings">My writings</InternalLink>
          </li>
        </ul>

        <p className="py-2">I&#39;m also available on:</p>

        <ul className="py-2 list-disc">
          <li className="ml-4 pl-2">
            <ExternalLink href="https://twitter.com/bnguyensn">
              Twitter
            </ExternalLink>
          </li>
          <li className="ml-4 pl-2">
            <ExternalLink href="https://github.com/bnguyensn">
              GitHub
            </ExternalLink>
          </li>
        </ul>

        <p className="py-2">Things I like:</p>

        <ul className="py-2 list-disc">
          <li className="ml-4 pl-2">Coffee ☕</li>
          <li className="ml-4 pl-2">Computers 💻</li>
          <li className="ml-4 pl-2">Creating 👷‍♂️</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  return {
    props: {
      title: configData.default.title,
    },
  };
}
