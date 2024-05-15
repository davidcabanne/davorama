import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as _var from "../../styles/variables";

import useElementOnScreen from "../../../hooks/useElementOnScreen";

const transitionOption = `500ms ${_var.cubicBezier}`;

const Container = styled.section`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${_var.spaceL};
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  padding: ${_var.spaceL} ${_var.spaceS};
`;

const SpaceTimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0px;
  transition: ${transitionOption};
  transition-property: gap;

  & p {
    font-size: 24px;
    font-weight: 500;
    writing-mode: vertical-rl;
    text-orientation: mixed;
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
  }

  & .leftPanel {
    transform: translateX(22px) rotate(180deg);

    & p {
      margin-right: -32px;
    }
  }

  & .rightPanel {
    writing-mode: vertical-lr;
    transform: translateX(-22px) rotate(180deg);

    & p {
      margin-left: -32px;
    }
  }

  &.active {
    gap: 18px;

    & .leftPanel {
      transform: translateX(0px) rotate(180deg);

      & p {
        margin-right: 0px;
      }
    }

    & .rightPanel {
      transform: translateX(0px) rotate(180deg);

      & p {
        margin-left: 0px;
      }
    }
  }
`;

const Paragraph = styled.p`
  position: relative;
  z-index: 1;
  opacity: ${(props) => (props.$active ? 0 : 1)};
  transform: ${(props) =>
    props.$active
      ? `translateX(0px) scale(${props.$translate.scale})`
      : `translateX(${props.$translate.translate}) scale(${props.$translate.scale})`};
  transition: ${transitionOption};
  transition-delay: ${(props) =>
    props.$active ? "0ms" : `${props.$translate.delay * 10}ms`};
  transition-property: margin-left, margin-right, opacity, transform;
`;

const Space = () => {
  const [active, setActive] = useState(false);

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

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

  useEffect(() => {
    if (isVisible) {
      setActive(isVisible);
    }
  }, [containerRef, isVisible]);

  return (
    <Container>
      <Wrapper>
        <p style={{ textAlign: "center", fontFamily: "Georgia" }}>
          Gravity is a Lie,
          <br />
          light speed is slow,
          <br />
          nothing is real,
          <br />
          the universe is electric
        </p>
        <SpaceTimeContainer
          ref={containerRef}
          className={active ? "active" : ""}
        >
          <div className="leftPanel">
            <Paragraph
              $translate={handleTranslate(1, "left", 1)}
              $active={!active}
              style={{ opacity: 1 }}
            >
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(2, "left", 1)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(3, "left", 1)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(4, "left", 1)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph
              $translate={handleTranslate(1, "left", 2)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(2, "left", 2)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(3, "left", 2)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(4, "left", 2)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND
            </Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph
              $translate={handleTranslate(1, "left", 3)}
              $active={!active}
            >
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(2, "left", 3)}
              $active={!active}
            >
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(3, "left", 3)}
              $active={!active}
            >
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(4, "left", 3)}
              $active={!active}
            >
              MOVING THROUGH SPACE
            </Paragraph>
          </div>
          <div className="leftPanel">
            <Paragraph
              $translate={handleTranslate(1, "left", 4)}
              $active={!active}
            >
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(2, "left", 4)}
              $active={!active}
            >
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(3, "left", 4)}
              $active={!active}
            >
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(4, "left", 4)}
              $active={!active}
            >
              MOVING THROUGH TIME
            </Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph
              $translate={handleTranslate(1, "right", 4)}
              $active={!active}
            >
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(2, "right", 4)}
              $active={!active}
            >
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(3, "right", 4)}
              $active={!active}
            >
              MOVING THROUGH TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(4, "right", 4)}
              $active={!active}
            >
              MOVING THROUGH TIME
            </Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph
              $translate={handleTranslate(1, "right", 3)}
              $active={!active}
            >
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(2, "right", 3)}
              $active={!active}
            >
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(3, "right", 3)}
              $active={!active}
            >
              MOVING THROUGH SPACE
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(4, "right", 3)}
              $active={!active}
            >
              MOVING THROUGH SPACE
            </Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph
              $translate={handleTranslate(1, "right", 2)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(2, "right", 2)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(3, "right", 2)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(4, "right", 2)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND
            </Paragraph>
          </div>
          <div className="rightPanel">
            <Paragraph
              $translate={handleTranslate(1, "right", 1)}
              $active={!active}
              style={{ opacity: 1 }}
            >
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(2, "right", 1)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(3, "right", 1)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
            <Paragraph
              $translate={handleTranslate(4, "right", 1)}
              $active={!active}
            >
              MOVING THROUGH SPACE AND TIME
            </Paragraph>
          </div>
        </SpaceTimeContainer>
      </Wrapper>
    </Container>
  );
};

export default Space;
