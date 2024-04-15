import client from '@/lib/sanityClient';

import Hero from '@/components/Hero';
import Grid from '@/components/Grid';

import * as _var from '../styles/variables';

export default function Home({ posts }) {
  const featuredPosts = posts.filter(
    (post) =>
      post.categories &&
      post.categories.some((category) => category.title === 'featured'),
  );

  return (
    <>
      <Hero posts={featuredPosts} />
      <Grid posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const query = `
  *[_type == "post"] | order(publishedAt desc) {
    'id': _id,
    slug,
    title,
    'categories': categories[]->{
         title
       },
    mainImage {
      asset->
    },
    publishedAt
  }
  `;
  const posts = await client.fetch(query);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
