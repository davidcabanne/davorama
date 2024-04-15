import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import client from '@/lib/sanityClient';
import styled from 'styled-components';

import * as _var from '@/styles/variables';

import Title from '@/components/Title';

const Placeholder = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  cursor: pointer;
  z-index: 1;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
  }
`;

const Modal = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0;
  z-index: 2;

  &.active {
    opacity: 1;
  }
`;

const ModalPlaceholder = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3601 / 2433;

  & img {
    position: absolute;
    inset: 0;
    aspect-ratio: 3601 / 2433;
    padding: ${_var.spaceS};
  }
`;

const Post = ({ post }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleOnClick = (event) => {
    setActive(!active);
  };

  return (
    <Placeholder onClick={(event) => handleOnClick(event)}>
      <Image
        src={post?.mainImage.asset.url}
        alt={post?.title}
        placeholder="blur"
        fill={true}
        blurDataURL={post?.mainImage.asset.metadata.lqip}
        sizes="100vw"
      />
      <Title>{post?.title}</Title>
      <Modal className={active ? 'active' : ''}>
        <ModalPlaceholder>
          <Image
            src={post?.mainImage.asset.url}
            alt={post?.title}
            placeholder="blur"
            fill={true}
            blurDataURL={post?.mainImage.asset.metadata.lqip}
            sizes="100vw"
          />
        </ModalPlaceholder>
      </Modal>
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
