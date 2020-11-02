import matter from 'gray-matter';

import Layout from '../components/Layout';
import PostList from '../components/PostList';

const Writings = ({ title, posts, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <div className="mx-auto max-w-screen-md px-4">
        <h6 className="py-4 font-bold">Writings</h6>

        <p className="py-2">My musings on life and technology:</p>

        <PostList posts={posts} />
      </div>
    </Layout>
  );
};

export default Writings;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      const value = values[index];
      const document = matter(value.default);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      };
    });

    return data;
  })(require.context('../posts', true, /\.md$/));

  // Sort posts by their dates in descending order
  posts.sort((postA, postB) => {
    const dateA = new Date(postA.frontmatter.date);
    const dateB = new Date(postB.frontmatter.date);

    return dateB - dateA;
  });

  return {
    props: {
      posts,
      title: configData.default.title,
    },
  };
}
