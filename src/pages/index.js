import client from "@/lib/sanityClient";
import * as _var from "../styles/variables";

import Hero from "@/components/sections/Hero";
import Capitalism from "@/components/sections/Capitalism";
import Space from "@/components/sections/Space";
import Grid from "@/components/sections/Grid";

export default function Home({ posts }) {
  return (
    <>
      <Hero />
      <Capitalism />
      <Space />
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
