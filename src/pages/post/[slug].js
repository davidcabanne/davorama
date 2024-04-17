import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import client from '@/lib/sanityClient';
import styled, { keyframes } from 'styled-components';
import { decode } from 'blurhash';

import * as _var from '@/styles/variables';

import Title from '@/components/Title';

const isLoadingAnimation = keyframes`
  0% {
  opacity: 1;
  }
  100% {
   opacity: .5;
  }
  `;

const hasLoadedAnimation = keyframes`
  0% {
  opacity:0;
  }
  100% {
   opacity: 1;
  }
  `;

const hasLoadedAnimationStatic = keyframes`
  0% {
  opacity: 1;
  }
  100% {
   opacity: 0;
  }
  `;

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

    &.isLoading {
      opacity: 0;
    }
    &.hasLoaded {
      animation: 200ms ${hasLoadedAnimation} ${_var.cubicBezier} forwards;
    }
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &.isLoadingStatic {
    animation: 1000ms ${isLoadingAnimation} linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  &.hasLoadedStatic {
    animation: 300ms ${hasLoadedAnimationStatic} ${_var.cubicBezier} forwards;
    animation-delay: 200ms;
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

  // transition => out
  transition: 500ms ${_var.cubicBezier};
  transition-property: opacity;
  transition-delay: 300ms;

  & img {
    // transition => out
    transform: scale(0.98);
    transition: 1000ms ${_var.cubicBezier};
    transition-property: transform;
    transition-delay: 01ms;
  }

  &.active {
    opacity: 1;
    // transition => in
    transition: 300ms ${_var.cubicBezier};
    transition-delay: 01ms;

    & img {
      // transition => in
      transition: 500ms ${_var.cubicBezier};
      transform: scale(1);
      transition-delay: 75ms;
    }
  }
`;

const ModalPlaceholder = styled.div`
  position: relative;
  width: 100%;
  max-width: calc(100vw - ${_var.headerHeight});
  height: 100%;
  max-height: calc(100vh - (${_var.headerHeight} * 2));
  aspect-ratio: 3601 / 2433;

  & img {
    position: absolute;
    object-fit: contain;
  }
`;

const Loading = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: blur(0px);
  transform: translateY(0px);
  transition: 500ms ${_var.cubicBezier};
  transition-property: filter, transform;
  z-index: 10;

  & p {
    position: relative;
    color: rgba(0, 0, 0, .5);
    font-size: 24px;
    font-weight: 500;
  }

  &.isLoading {
    animation: 1000ms ${isLoadingAnimation} linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  &.hasLoaded {
    filter: blur(16px);
    transform: translateY(8px);
    transition-delay: 250ms;
    animation: 200ms ${hasLoadedAnimationStatic} ${_var.cubicBezier} forwards;
    animation-delay: 350ms;
  }
`;

const StyledTitle = styled(Title)`
  & > div {
    opacity: 0;
    transform: translateX(-8px);
    transition: 200ms ${_var.cubicBezier};
    transition-property: opacity, transform;
    transition-delay: 200ms;
  }

  &.isLoading {
    & > div {
      opacity: 0;
    }
  }
  &.hasLoaded {
    & > div {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;

const Post = ({ post }) => {
  const [isLoading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActive(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (post?.mainImage.asset.metadata.blurHash && canvasRef.current) {
      const width = 32;
      const height = 32;
      const pixels = decode(
        post.mainImage.asset.metadata.blurHash,
        width,
        height,
      );
      const ctx = canvasRef.current.getContext('2d');
      const imageData = new ImageData(
        new Uint8ClampedArray(pixels),
        width,
        height,
      );
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      ctx.putImageData(imageData, 0, 0);
    }
  }, [post]);

  const handleOnClick = () => {
    setActive(!active);
  };

  return (
    <Placeholder onClick={() => handleOnClick()}>
      <Loading className={isLoading ? 'isLoading' : 'hasLoaded'}>
        <p>Loading...</p>
      </Loading>
      <Image
        src={post?.mainImage.asset.url}
        alt={post?.title}
        placeholder="blur"
        fill={true}
        blurDataURL={post?.mainImage.asset.metadata.lqip}
        sizes="100vw"
        onLoad={() => setLoading(false)}
        className={isLoading ? 'isLoading' : 'hasLoaded'}
      />
      <Canvas
        ref={canvasRef}
        className={isLoading ? 'isLoadingStatic' : 'hasLoadedStatic'}
      />
      <StyledTitle className={isLoading ? 'isLoading' : 'hasLoaded'}>
        {post?.title}
      </StyledTitle>
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
