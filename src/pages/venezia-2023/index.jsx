import client from "@/lib/sanityClient";
import Grid from "@/components/sections/Grid";

export default function Venezia({ posts }) {
  return <Grid posts={posts} />;
}

export async function getStaticProps() {
  const query = `
  *[_type == "post" && "venezia" in categories[]->title] | order(publishedAt desc) {
      'id': _id,
      slug,
      title,
      'categories': categories[]->{
           title
         },
         mainImage {
            asset->{
              url,
              metadata {
                lqip,
                blurHash
              }
            }
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
