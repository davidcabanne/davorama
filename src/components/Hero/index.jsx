import React from "react";
import Image from "next/image";
import styled from "styled-components";

import * as _var from "../../styles/variables";

import heroImg from "../../../public/images/hero/heroEye.jpg";

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${_var.clr_light};
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${_var.headerHeight};
`;

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(32px, 50vh) minmax(32px, 50vh);
  align-items: start;
  padding: ${_var.spaceM};
`;

const Panel = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:first-child {
    transform: translateY(calc(22px + 16px));
    margin-right: 32px;

    @media ${_var.device.tablet_max} {
      margin-right: 16px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: ${_var.spaceS};
`;

const Title = styled.p`
  font-size: 16px;
`;

const ParagraphSmall = styled.p`
  font-size: clamp(2px, 1.5vw, 14px);
  line-height: 1.25;

  & span {
    font-size: inherit;
  }
`;

const Text = styled.div`
  & :first-child {
    text-align: center;
  }
  & span {
    color: transparent;

    & b {
      color: transparent;

      &::selection {
        color: transparent;
        background: #232022;
      }
    }

    &::selection {
      color: red;
      background: #232022;
    }
  }
`;

const Placeholder = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 16/11;
  overflow: hidden;
  z-index: 0;
  background: ${_var.clr_light};

  @media ${_var.device.tablet_max} {
    aspect-ratio: 16/16;
  }

  & p {
    position: relative;
    word-wrap: break-word;
    font-size: 8px;
    aspect-ratio: 16/11;
    overflow: hidden;
    z-index: 2;
    color: #232022;
    mix-blend-mode: exclusion;

    &::selection {
      color: #1b32df;
      background: #232022;
    }
  }
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: grayscale(1);
  mix-blend-mode: color-burn;
`;

const LowerPanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${_var.spaceS};
  margin-top: clamp(16px, 5vw, 32px);

  & svg {
    width: 75%;
    transform: translateX(-50%);
  }
`;

const Hero = () => {
  return (
    <Container>
      <Wrapper>
        <Grid>
          <Panel>
            <Content>
              <Title>self promoting</Title>
              <Text>
                <ParagraphSmall>I have found myself walking</ParagraphSmall>
                <ParagraphSmall>
                  towards myself, staring at
                  <span>
                    <b>___</b>i<b>___</b>
                  </span>
                  myself, and I stared at
                </ParagraphSmall>
                <ParagraphSmall>
                  myself staring at myself,
                  <span>
                    <b>__</b>want<b>___</b>
                  </span>
                  walking from myself
                </ParagraphSmall>
                <ParagraphSmall>
                  staring at
                  <span>
                    <b>__________________</b>to
                    <b>_________________</b>
                  </span>
                  oneself.
                </ParagraphSmall>
              </Text>
              <Text style={{ marginTop: "-16px" }}>
                <ParagraphSmall>
                  I have found
                  <span>
                    <b>____________</b> believe <b>_______________</b>
                  </span>
                  myself
                </ParagraphSmall>
                <ParagraphSmall>
                  walking towards myself,
                  <span>
                    <b>___</b> ☺︎
                    <b>__</b>
                  </span>
                  staring at myself, and I
                </ParagraphSmall>
                <ParagraphSmall style={{ textAlign: "center" }}>
                  stared at myself staring at myself, walking
                </ParagraphSmall>
                <ParagraphSmall style={{ textAlign: "center" }}>
                  away from myself.
                </ParagraphSmall>
              </Text>
            </Content>
          </Panel>
          <Panel>
            <Content>
              <Title>is wack.</Title>
              <Placeholder>
                <StyledImage src={heroImg} alt="" placeholder="blur" />
                <p>
                  +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
                </p>
              </Placeholder>
            </Content>
          </Panel>
          <Content></Content>
          <Content>
            <LowerPanel>
              <svg
                viewBox="0 0 268 237"
                fill="none"
                xmlSpace="preserve"
                xmlns="httres://www.w3.org/2000/svg"
              >
                <path
                  d="M232 2C232 130.13 128.13 234 0 234"
                  stroke="#191718"
                  strokeWidth="6"
                />
                <line
                  x1="196"
                  y1="3"
                  x2="268"
                  y2="3"
                  stroke="#191718"
                  strokeWidth="6"
                />
              </svg>
            </LowerPanel>
          </Content>
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Hero;
