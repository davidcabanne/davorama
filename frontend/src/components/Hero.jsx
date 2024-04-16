import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import * as _var from '../styles/variables';

const timing = 6000;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
    opacity: 0;
    transition: opacity 500ms ${_var.cubicBezier};
  }
`;

const Slider = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 4px;
  display: flex;
`;

const NavigationDot = styled.div`
  background: rgba(250, 250, 250, 0.15);
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: 500ms ${_var.cubicBezier};
  transition-property: background;

  &:hover {
    -webkit-box-shadow: inset 0px 0px 0px 10px rgba(250, 250, 250, 0.35);
    -moz-box-shadow: inset 0px 0px 0px 10px rgba(250, 250, 250, 0.35);
    box-shadow: inset 0px 0px 0px 10px rgba(250, 250, 250, 0.35);
  }
`;

const Hero = ({ posts }) => {
  const containerRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % posts.length);
    }, timing);

    return () => clearInterval(interval);
  }, [posts.length]);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  const navigationDotStyle = (index) => {
    return {
      background:
        index === currentImage
          ? 'rgba(250, 250, 250, .75)'
          : 'rgba(250, 250, 250, 0.15)',
    };
  };

  return (
    <Container ref={containerRef}>
      {posts?.map((post, index) => {
        return (
          <Image
            key={post?.id}
            index={index}
            src={post?.mainImage.asset.url}
            alt={post?.title}
            placeholder="blur"
            fill={true}
            blurDataURL={post?.mainImage.asset.metadata.lqip}
            sizes="100vw"
            style={{
              transform: `translateY(${offsetY * 0.05}px)`,
              opacity: index === currentImage ? 1 : 0,
            }}
          />
        );
      })}
      <Slider>
        {posts?.map((post, index) => {
          return (
            <NavigationDot
              key={post?.id}
              onClick={() => handleDotClick(index)}
              $index={index}
              style={navigationDotStyle(index)}
            />
          );
        })}
      </Slider>
    </Container>
  );
};

export default Hero;
