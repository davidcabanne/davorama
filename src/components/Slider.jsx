import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import * as _var from '../styles/variables';

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  gap: 2px;
`;

const NavigationDot = styled.div`
  position: relative;
  background: rgba(250, 250, 250, 0.25);
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: 500ms ${_var.cubicBezier};
  transition-property: background;

  & span {
    position: absolute;
    left: 0;
    width: 0%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    transition: 0ms linear;
    transition-property: width;

    &.active {
      width: 100%;
      transition: ${({ $duration }) => `${$duration}ms`} linear;
      transition-property: width;
    }
  }

  &:hover {
    -webkit-box-shadow: inset 0px 0px 0px 10px rgba(250, 250, 250, 0.35);
    -moz-box-shadow: inset 0px 0px 0px 10px rgba(250, 250, 250, 0.35);
    box-shadow: inset 0px 0px 0px 10px rgba(250, 250, 250, 0.35);
  }
`;

const Slider = ({
  posts,
  currentImage,
  handleSetCurrentImage,
  duration,
  height,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(currentImage);
    }, 10);

    return () => clearTimeout(timer);
  }, [currentImage]);

  const navigationDotStyle = (index) => {
    return {
      background:
        index === currentImage
          ? 'rgba(250, 250, 250, .75)'
          : 'rgba(250, 250, 250, 0.15)',
    };
  };

  return (
    <Container style={{ height: height }}>
      {posts?.map((post, index) => {
        return (
          <NavigationDot
            key={post?.id}
            onClick={() => handleSetCurrentImage(index)}
            $index={index}
            $duration={duration}
            $height={height}
            style={navigationDotStyle(index)}
          >
            <span className={index === activeIndex ? 'active' : ''}></span>
          </NavigationDot>
        );
      })}
    </Container>
  );
};

export default Slider;
