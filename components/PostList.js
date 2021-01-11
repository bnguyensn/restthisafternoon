import InternalLink from './InternalLink';

export default function PostList({ posts }) {
  if (posts === 'undefined' || !posts) {
    return null;
  }

  return (
    <ul className="py-2 list-disc">
      {posts &&
        posts.map((post) => {
          return (
            <li key={post.slug} className="list-item-interactive ml-4 pl-2">
              <InternalLink href={{ pathname: `/writings/${post.slug}` }}>
                {post.frontmatter.title}
              </InternalLink>
            </li>
          );
        })}
    </ul>
  );
}
