import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as _var from "../../styles/variables";

import useWindowWidth from "../../../hooks/useWindowWidth";

import { Section, Wrapper } from "./Section";

const CapitalismContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const Works = () => {
  const containerRef = useRef(null);
  const [margin, setMargin] = useState(0);

  const innerWidth = useWindowWidth();

  useEffect(() => {
    if (containerRef?.current) {
      const containerWidth =
        containerRef?.current.getBoundingClientRect().width;
      setMargin(containerWidth / 6);
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
    <Section $capitalism>
      <Wrapper>
        <TitlePanel
          style={{
            transform: `translateX(-${margin}px) translateY(-${margin}px)`,
          }}
        >
          <Title>Live life love laugh</Title>
          <Title className="subtitle">Die death hate rage</Title>
        </TitlePanel>
        <CapitalismContainer
          ref={containerRef}
          style={{
            transform: `translateX(-${margin}px) translateY(-${margin}px)`,
          }}
        >
          {handleRenderParagraphs(25, "Capitalism")}
          {handleRenderParagraphs(25, "Socialism")}
        </CapitalismContainer>
      </Wrapper>
    </Section>
  );
};

export default Works;
