import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import Layout from '../../components/Layout';
import { formatDate } from '../../libs/date';
import { useLocale } from '../../libs/dom';

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  const locale = useLocale();

  if (!frontmatter) return <></>;

  return (
    <Layout
      pageTitle={`${siteTitle} | ${frontmatter.title}`}
      keywords={frontmatter.tags}
    >
      <div className="mx-auto max-w-screen-md px-4">
        <article className="blog-post pb-4">
          <h3 className="py-2 font-bold">{frontmatter.title}</h3>

          <div className="pb-4 text-sm text-gray-600">
            {formatDate(new Date(frontmatter.date), locale)}
          </div>

          <section>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');

                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      customStyle={{
                        maxHeight: 'inherit',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {markdownBody}
            </ReactMarkdown>
          </section>
        </article>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { postname } }) {
  const content = await import(`../../posts/${postname}.md`);
  const config = await import(`../../siteconfig.json`);
  const data = matter(content.default);

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key) => {
      let slug = key.replace(/^.*[\\/]/, '').slice(0, -3);

      return slug;
    });
    return data;
  })(require.context('../../posts', true, /\.md$/));

  const paths = blogSlugs.map((slug) => `/writings/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
