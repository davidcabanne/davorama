import client from '@/lib/sanityClient';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import * as _var from '../styles/variables';

const Grid = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media ${_var.device.tablet_max} {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const Placeholder = styled(Link)`
  position: relative;
  width: 100%;
  aspect-ratio: 3601 / 2433;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
  }

  &:hover div {
    opacity: 1;
  }
`;

const Title = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
  padding: ${_var.spaceS} ${_var.spaceM};
  opacity: 0;
`;

export default function Home({ posts }) {
  return (
    <Grid>
      {posts.map((post) => {
        return (
          <Placeholder
            key={post?.id}
            href={`/post/${encodeURIComponent(post.slug.current)}`}
          >
            <Image
              src={post?.mainImage.asset.url}
              alt={post?.title}
              placeholder="blur"
              fill={true}
              blurDataURL={post?.mainImage.asset.metadata.lqip}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Title>{post.title}</Title>
          </Placeholder>
        );
      })}
    </Grid>
  );
}

export async function getStaticProps() {
  const query = `
  *[_type == "post"] | order(publishedAt desc) {
    'id': _id,
    slug,
    title,
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
