import Image from 'next/image';
import client from '@/lib/sanityClient';
import styled from 'styled-components';

import * as _var from '@/styles/variables';

const Placeholder = styled.div`
  position: relative;
  width: 100%;
  height: 100svh;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
  }
`;

const Title = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
  padding: ${_var.spaceM};
`;

const Post = ({ post }) => {
  return (
    <Placeholder>
      <Image
        src={post?.mainImage.asset.url}
        alt={post?.title}
        placeholder="blur"
        fill={true}
        blurDataURL={post?.mainImage.asset.metadata.lqip}
        sizes="100vw"
      />
      <Title>{post.title}</Title>
    </Placeholder>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "post" && defined(slug.current)][].slug.current`;
  const slugs = await client.fetch(query);
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      "categories": categories[]->title,
      mainImage {
        asset->
      },
      body,
    }
  `;
  const post = await client.fetch(query, { slug: params.slug });
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default Post;
