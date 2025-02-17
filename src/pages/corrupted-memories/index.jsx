import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import * as _var from "../../styles/variables";

import useWindowWidth from "../../../hooks/useWindowWidth";

import { memories } from "../../../store/memories";

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-weight: 500;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContainerBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;

  & > div,
  &::before,
  &::after {
    position: absolute;
    inset: 0;
  }
  &::before {
    content: "";
    z-index: 1;
    backdrop-filter: blur(1px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 12.5%,
      rgba(0, 0, 0, 1) 25%,
      rgba(0, 0, 0, 0) 37.5%
    );
  }
  & > div:nth-of-type(1) {
    z-index: 2;
    backdrop-filter: blur(2px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 12.5%,
      rgba(0, 0, 0, 1) 25%,
      rgba(0, 0, 0, 1) 37.5%,
      rgba(0, 0, 0, 0) 50%
    );
  }
  & > div:nth-of-type(2) {
    z-index: 3;
    backdrop-filter: blur(4px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 1) 37.5%,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) 62.5%
    );
  }
  & > div:nth-of-type(3) {
    z-index: 4;
    backdrop-filter: blur(8px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 37.5%,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 1) 62.5%,
      rgba(0, 0, 0, 0) 75%
    );
  }
  & > div:nth-of-type(4) {
    z-index: 5;
    backdrop-filter: blur(16px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 1) 62.5%,
      rgba(0, 0, 0, 1) 75%,
      rgba(0, 0, 0, 0) 87.5%
    );
  }
  & > div:nth-of-type(5) {
    z-index: 6;
    backdrop-filter: blur(32px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 62.5%,
      rgba(0, 0, 0, 1) 75%,
      rgba(0, 0, 0, 1) 87.5%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  & > div:nth-of-type(6) {
    z-index: 7;
    backdrop-filter: blur(64px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, 1) 87.5%,
      rgba(0, 0, 0, 1) 100%
    );
  }
  &::after {
    content: "";
    z-index: 8;
    backdrop-filter: blur(128px);
    mask: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 87.5%,
      rgba(0, 0, 0, 1) 100%
    );
  }
`;

const Grid = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  width: 100%;
  padding-top: ${_var.headerHeight};
  overflow: hidden;
  gap: 8px;
  list-style: none;
`;

const Li = styled.li`
  position: relative;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: transform 500ms ease-out;

  & span {
    text-transform: uppercase;
    font-style: oblique;
    white-space: nowrap;
    z-index: 10;
  }

  ${({ $isCorrupted }) =>
    $isCorrupted &&
    css`
      &::before,
      &::after {
        position: absolute;
        font-weight: 900;
        font-style: oblique;
        color: ${_var.primary_010};
      }

      &::before {
        content: "MISSING";
        bottom: 0;
        right: 0;
        z-index: -1;
      }

      &::after {
        content: "ALTERED";
        top: 0;
        left: 0;
        z-index: 2;
      }
    `}
`;

const BadMemories = styled.div`
  position: relative;

  & span:nth-child(2) {
    font-style: normal;
  }
`;

const Span = styled.span`
  ${({ $isCorrupted }) =>
    $isCorrupted &&
    css`
      text-decoration: line-through;
    `};

  ${({ $isOffset }) =>
    $isOffset &&
    css`
      position: absolute;
      top: -2px;
      left: 2px;
    `};

  ${({ $isBad }) =>
    $isBad &&
    css`
      font-size: 24px;
    `};

  ${({ $isGood }) =>
    $isGood &&
    css`
      font-size: 24px;
      color: ${_var.primary_020};
    `};
`;

const CorruptedMemories = () => {
  const [randomOffsets, setRandomOffsets] = useState([]);
  const [memoryList, setMemoryList] = useState([]);
  const [corruptedIndices, setCorruptedIndices] = useState([]);

  const windowWidth = useWindowWidth();

  const memoryCount = 80;
  const maxXOffsetPercent = 47; // X max offset in [%]
  const maxYOffset = 25; // Y max offset in [pixels]

  useEffect(() => {
    const generateRandomOffsets = () => {
      return Array.from({ length: memoryCount }, () => ({
        x: ((Math.random() * 2 - 1) * (windowWidth * maxXOffsetPercent)) / 100, // Percentage-based X offset
        y: Math.floor(Math.random() * maxYOffset * 2) - maxYOffset, // Keep Y in pixels
      }));
    };

    setRandomOffsets(generateRandomOffsets());

    // Create a full list with corrupted memories
    let fullList = Array.from({ length: memoryCount }, (_, index) => ({
      id: index,
      text: `CORRUPTED MEMORY (${index})`,
      type: null,
    }));

    // Insert specific memories at random positions without overwriting
    // Shuffle the available slots and insert memories
    let availableIndices = [...Array(memoryCount).keys()].sort(
      () => Math.random() - 0.5
    );
    memories.forEach((memory, i) => {
      const index = availableIndices[i]; // Get a random available index
      if (index !== undefined) {
        fullList[index] = { id: index, ...memory }; // Assign memory with generated id
      }
    });

    setMemoryList(fullList);

    // Select 50% of memoryList items to display ::before and ::after
    const shuffledIndices = [...Array(memoryCount).keys()].sort(
      () => Math.random() - 0.5
    );
    setCorruptedIndices(shuffledIndices.slice(0, Math.floor(memoryCount / 5)));
  }, [windowWidth]);

  return (
    <Root>
      <Container>
        <Grid>
          {memoryList.map(({ id, text, type }, index) => {
            const isCorruptedMemory = type === null;
            const isGoodMemory = type === true;
            const isBadMemory = type === false;

            return (
              <Li
                key={id}
                $isCorrupted={
                  corruptedIndices.includes(index) && isCorruptedMemory
                }
                style={{
                  transform: `translate(${randomOffsets[index]?.x}px, ${randomOffsets[index]?.y}px)`,
                }}
              >
                {isCorruptedMemory && <Span $isCorrupted>{text}</Span>}
                {isBadMemory && (
                  <BadMemories>
                    <Span $isOffset $isBad>
                      {text}
                    </Span>
                    <Span $isBad>{text}</Span>
                  </BadMemories>
                )}
                {isGoodMemory && <Span $isGood>{text}</Span>}
              </Li>
            );
          })}
        </Grid>
        <ContainerBlur>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </ContainerBlur>
      </Container>
    </Root>
  );
};

export default CorruptedMemories;
