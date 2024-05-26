import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import * as _var from "../../styles/variables";

import { Section, Wrapper } from "../../components/sections/Section";

const transitionOption = `500ms ${_var.cubicBezier}`;

const StyledSection = styled(Section)`
  position: relative;
  height: 100vh;
  background: black;

  & p {
    &::selection {
      color: black;
      background: white;
    }
  }
`;

const StyledWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${_var.spaceM};
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  mix-blend-mode: multiply;
  z-index: 2;
`;

const SpaceTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 18px;
  transition: ${transitionOption};
  transition-property: gap;

  & p {
    color: ${_var.clr_light};
    font-size: 24px;
    font-weight: 500;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    filter: blur(1.5px);
  }

  & div {
    position: relative;
    display: flex;
  }

  & .leftPanel,
  .rightPanel {
    transition: ${transitionOption};
    transition-property: transform;

    & p:not(:nth-child(1)) {
      position: absolute;
      top: 0;
      left: 0;
    }

    & p:nth-child(2) {
      z-index: 10;
    }
    & p:nth-child(1) {
      opacity: 1;
      z-index: 9;
    }
    & p:nth-child(2) {
      opacity: 0.4;
      z-index: 9;
    }
    & p:nth-child(3) {
      opacity: 0.3;
      z-index: 8;
    }
    & p:nth-child(4) {
      opacity: 0.1;
      z-index: 7;
    }
  }

  & .leftPanel {
    transform: rotate(180deg);
  }

  & .rightPanel {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
`;

const Paragraph = styled.p`
  position: relative;
  z-index: 1;
`;

const Space = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef]);

  return (
    <StyledSection>
      <Video ref={videoRef} autoPlay muted loop>
        <source src="videos/universeSimulation.webm" type="video/webm" />
      </Video>
      <StyledWrapper>
        <p
          style={{
            textAlign: "center",
            fontFamily: "Georgia",
            color: `${_var.clr_light}`,
          }}
        >
          Gravity is a Lie,
          <br />
          light speed is slow,
          <br />
          nothing is real,
          <br />
          the universe is simulated
        </p>
        <SpaceTimeContainer>
          <div className="leftPanel">
            <Paragraph>MOVING THROUGH SPACE AND TIME</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND TIME</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND TIME</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND TIME</Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph>MOVING THROUGH SPACE AND</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND</Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph>MOVING THROUGH SPACE</Paragraph>
            <Paragraph>MOVING THROUGH SPACE</Paragraph>
            <Paragraph>MOVING THROUGH SPACE</Paragraph>
            <Paragraph>MOVING THROUGH SPACE</Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph>MOVING THROUGH TIME</Paragraph>
            <Paragraph>MOVING THROUGH TIME</Paragraph>
            <Paragraph>MOVING THROUGH TIME</Paragraph>
            <Paragraph>MOVING THROUGH TIME</Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph>MOVING THROUGH TIME</Paragraph>
            <Paragraph>MOVING THROUGH TIME</Paragraph>
            <Paragraph>MOVING THROUGH TIME</Paragraph>
            <Paragraph>MOVING THROUGH TIME</Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph>MOVING THROUGH SPACE</Paragraph>
            <Paragraph>MOVING THROUGH SPACE</Paragraph>
            <Paragraph>MOVING THROUGH SPACE</Paragraph>
            <Paragraph>MOVING THROUGH SPACE</Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph>MOVING THROUGH SPACE AND</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND</Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph>MOVING THROUGH SPACE AND TIME</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND TIME</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND TIME</Paragraph>
            <Paragraph>MOVING THROUGH SPACE AND TIME</Paragraph>
          </div>
        </SpaceTimeContainer>
      </StyledWrapper>
    </StyledSection>
  );
};

export default Space;
