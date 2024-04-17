import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { decode } from 'blurhash';

import * as _var from '../styles/variables';

import Slider from './Slider';

const hasLoadedAnimationStatic = keyframes`
  0% {
  opacity: 1;
  }
  100% {
   opacity: 0;
  }
  `;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background: #2b303a;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
    opacity: 0;
    transition: opacity 500ms ${_var.cubicBezier};
    will-change: opacity, transform;
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &.hasLoadedStatic {
    animation: 300ms ${hasLoadedAnimationStatic} ${_var.cubicBezier} forwards;
    animation-delay: 200ms;
  }
`;

const Hero = ({ posts, duration }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoading, setLoading] = useState(true);
  const [offsetY, setOffsetY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  const handleSetCurrentImage = (value) => {
    setCurrentImage(value);
  };

  useEffect(() => {
    if (posts && canvasRef.current) {
      const width = 32;
      const height = 32;
      const pixels = decode(
        posts[0].mainImage.asset.metadata.blurHash,
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
  }, [posts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % posts.length);
    }, duration);

    return () => clearInterval(interval);
  }, [posts.length, duration, currentImage]);

  return (
    <Container ref={containerRef}>
      {posts?.map((post, index) => {
        return (
          <Image
            key={post?.id}
            index={index}
            src={post?.mainImage.asset.url}
            alt={post?.title}
            priority={true}
            placeholder="blur"
            fill={true}
            blurDataURL={post?.mainImage.asset.metadata.lqip}
            sizes="100vw"
            onLoad={() => setLoading(false)}
            className={isLoading ? 'isLoading' : 'hasLoaded'}
            style={{
              transform: `translateY(${offsetY * 0.05}px)`,
              opacity: index === currentImage ? 1 : 0,
            }}
          />
        );
      })}
      <Canvas
        ref={canvasRef}
        className={isLoading ? 'isLoadingStatic' : 'hasLoadedStatic'}
      />
      <Slider
        posts={posts}
        currentImage={currentImage}
        handleSetCurrentImage={handleSetCurrentImage}
        duration={duration}
        height={2}
      />
    </Container>
  );
};

export default Hero;
