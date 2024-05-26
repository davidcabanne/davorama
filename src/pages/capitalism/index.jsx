import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import * as _var from "../../styles/variables";

import useWindowWidth from "../../../hooks/useWindowWidth";

import { Section, Wrapper } from "../../components/sections/Section";
import capitalismImage from "../../../public/images/capitalism/capitalism.jpg";

const StyledSection = styled(Section)`
  position: relative;
  height: 100vh;

  & > div {
    z-index: 1;
    width: auto;
    background: white;
    padding: 0px ${_var.spaceL};
    box-shadow: ${_var.cardShadowXLarge};
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: #fd0317;
    mix-blend-mode: soft-light;
  }
`;

const CapitalismContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;

  & p {
    font-size: clamp(2px, 2vw, 16px);
    text-transform: uppercase;
    font-weight: 500;
    line-height: 0.9;
    white-space: nowrap;
  }

  & div:nth-child(1) {
    position: relative;
  }

  & div:not(:nth-child(1)) {
    position: absolute;
  }

  & div > .capitalism {
    z-index: 1;
  }

  & div > .socialism {
    letter-spacing: 0.775px;
    color: transparent;
    z-index: 10;
    transition: 200ms ${_var.cubicBezier};

    &::selection {
      color: ${_var.clr_danger};
      background: ${_var.clr_dark};
    }
  }
`;

const TitlePanel = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-style: italic;
  font-family: georgia;

  &.subtitle {
    position: absolute;
    top: 0;
    color: transparent;

    &::selection {
      color: ${_var.clr_danger};
      background: ${_var.clr_dark};
    }
  }
`;

const StyledImage = styled(Image)`
  position: absolute;
  inset: 0;
  object-fit: cover;
  user-select: none;
`;

const Capitalism = () => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const innerWidth = useWindowWidth();

  useEffect(() => {
    if (containerRef?.current) {
      const containerWidth =
        containerRef?.current.children[0].getBoundingClientRect().width;

      const containerHeight =
        containerRef?.current.children[0].getBoundingClientRect().height;

      const paragraphAmount = 11;
      const paragraphHeight =
        containerRef?.current.children[0].children[0].getBoundingClientRect()
          .height;

      const totalHeight = containerHeight + paragraphHeight * paragraphAmount;
      const totalWidth = containerWidth + containerWidth * 0.33;

      setHeight(totalHeight);
      setWidth(totalWidth);
    }
  }, [innerWidth, containerRef]);

  const handleRenderParagraphs = (length, word) => {
    const text = Array.from({ length: length }, (_, i) => (
      <p key={i} className={word === "Capitalism" ? "capitalism" : "socialism"}>
        {word} {word} {word} {word}
      </p>
    ));

    const paragraphs = Array.from({ length: length / 2 }, (_, i) => (
      <div
        key={"p" + i}
        style={{ transform: `translateX(${3 * i}%) translateY(${4 * i}%)` }}
      >
        {text}
      </div>
    ));

    return <>{paragraphs}</>;
  };

  return (
    <StyledSection>
      <Wrapper>
        <TitlePanel>
          <Title>Live life love laugh</Title>
          <Title className="subtitle">Die death hate rage</Title>
        </TitlePanel>
        <CapitalismContainer
          ref={containerRef}
          style={{
            height: height,
            width: width,
          }}
        >
          {handleRenderParagraphs(25, "Capitalism")}
          {handleRenderParagraphs(25, "Socialism")}
        </CapitalismContainer>
      </Wrapper>
      <StyledImage
        src={capitalismImage}
        alt="Live, life, love, laugh, capitalism"
        placeholder="blur"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </StyledSection>
  );
};

export default Capitalism;
