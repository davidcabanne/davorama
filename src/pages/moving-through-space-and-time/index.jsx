import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import * as _var from "../../styles/variables";

import { Section, Wrapper } from "../../components/sections/Section";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

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
  opacity: 0;
  animation: 2s ${fadeIn} ease-in-out forwards;
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
  opacity: 0;
  animation: 2s ${fadeIn} ease-in-out forwards;

  @media ${_var.device.desktop_max} {
    transform: scale(2);
  }
`;

const SpaceTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 18px;

  & p {
    color: ${_var.primary_100};
    font-size: 24px;
    font-weight: 500;
    writing-mode: vertical-rl;
    text-orientation: mixed;

    @media ${_var.device.tablet_max} {
      font-size: clamp(12px, 4vw, 24px);
    }
  }

  & div {
    position: relative;
    display: flex;
  }

  & .leftPanel,
  .rightPanel {
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
      filter: blur(1px);
      z-index: 9;
    }
    & p:nth-child(2) {
      opacity: 0.6;
      filter: blur(1px);
      z-index: 9;
    }
    & p:nth-child(3) {
      opacity: 0.5;
      filter: blur(2px);
      z-index: 8;
    }
    & p:nth-child(4) {
      opacity: 0.4;
      filter: blur(2px);
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
  transform: ${(props) => `translateX(${props.$translate.translate})
    scale(${props.$translate.scale})`};
`;

const Space = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 11.5; // Start at 11.5s
        videoRef.current.playbackRate = 0.5; // Slow motion
        videoRef.current.play(); // Auto-play
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, []);

  const base = 16;
  const scale = 0.1;

  const handleTranslate = (amount, side, ratio) => {
    const ratioAmount = ratio / 1.05;
    return {
      translate:
        side === "left"
          ? `-${(base * amount * 0.75) / ratioAmount}px`
          : `${(base * amount * 0.75) / ratioAmount}px`,
      scale: `${1 - scale * amount}`,
      delay: amount,
    };
  };

  return (
    <StyledSection>
      <Video ref={videoRef} playsInline autoPlay muted loop preload="auto">
        <source src="videos/universeSimulation.webm" type="video/webm" />
      </Video>
      <StyledWrapper>
        <p
          style={{
            textAlign: "center",
            fontFamily: "Georgia",
            color: `${_var.primary_100}`,
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
            <Paragraph $translate={handleTranslate(1, "left", 1)}>
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(2, "left", 1)}>
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(3, "left", 1)}>
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(4, "left", 1)}>
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph $translate={handleTranslate(1, "left", 2)}>
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph $translate={handleTranslate(2, "left", 2)}>
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph $translate={handleTranslate(3, "left", 2)}>
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph $translate={handleTranslate(4, "left", 2)}>
              MOVING THROUGH SPACE AND
            </Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph $translate={handleTranslate(1, "left", 3)}>
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph $translate={handleTranslate(2, "left", 3)}>
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph $translate={handleTranslate(3, "left", 3)}>
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph $translate={handleTranslate(4, "left", 3)}>
              MOVING THROUGH SPACE
            </Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph $translate={handleTranslate(1, "left", 4)}>
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(2, "left", 4)}>
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(3, "left", 4)}>
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(4, "left", 4)}>
              MOVING THROUGH TIME
            </Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph $translate={handleTranslate(1, "right", 4)}>
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(2, "right", 4)}>
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(3, "right", 4)}>
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(4, "right", 4)}>
              MOVING THROUGH TIME
            </Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph $translate={handleTranslate(1, "right", 3)}>
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph $translate={handleTranslate(2, "right", 3)}>
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph $translate={handleTranslate(3, "right", 3)}>
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph $translate={handleTranslate(4, "right", 3)}>
              MOVING THROUGH SPACE
            </Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph $translate={handleTranslate(1, "right", 2)}>
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph $translate={handleTranslate(2, "right", 2)}>
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph $translate={handleTranslate(3, "right", 2)}>
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph $translate={handleTranslate(4, "right", 2)}>
              MOVING THROUGH SPACE AND
            </Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph $translate={handleTranslate(1, "right", 1)}>
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(2, "right", 1)}>
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(3, "right", 1)}>
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph $translate={handleTranslate(4, "right", 1)}>
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
          </div>
        </SpaceTimeContainer>
      </StyledWrapper>
    </StyledSection>
  );
};

export default Space;
