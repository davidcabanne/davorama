import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import * as _var from "@/styles/variables";

import tvStatic from "../../../../public/videos/tvStatic.gif";
// import tvStaticMagnetic from "../../../public/videos/tvStaticMagnetic.gif";

import { categories } from "../../../../store/home";

const TOTAL_CELLS = 80;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: ${_var.headerHeight};
  display: grid;
  grid-template-columns: 1fr 2fr 4fr 8fr 8fr 4fr 2fr 1fr;

  grid-template-rows: repeat(
    10,
    calc((100vh - ${_var.headerHeight} - 16px) / 5)
  );

  @media ${_var.device.tablet_min} {
    display: none;
  }

  @media ${_var.device.mobileL_max} {
    grid-template-columns: calc(100vw / 8) 1fr 1fr calc(100vw / 8);
    grid-template-rows: repeat(20, calc((100vh - ${_var.headerHeight}) / 5));
  }

  @media ${_var.device.mobileS_max} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(40, calc((100vh - ${_var.headerHeight}) / 5));
  }
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* min-height: calc(200vh / 12); */
  overflow: hidden;
  border-radius: 2px;

  & div:nth-child(1) {
    position: relative;

    padding: 8px;
    z-index: 5;
  }

  & .title {
    color: ${_var.primary_090};
    text-transform: uppercase;
    font-style: italic;
    font-weight: 700;
    white-space: nowrap;
  }

  & img:nth-child(2) {
    z-index: 0;
    filter: grayscale(1);
  }

  & img:nth-child(3) {
    z-index: 4;
    mix-blend-mode: multiply;
  }

  @media ${_var.device.mobileL_max} {
    font-size: 8px;
  }
`;

const StyledImage = styled(Image)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Cell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: ${_var.primary_010};
  font-size: 8px;
  opacity: 1;
  text-align: ${({ $isReversed }) => ($isReversed ? "left" : "right")};
`;

const Mobile = () => {
  const [gridItems, setGridItems] = useState([]);
  const [midColumn, setMidColumn] = useState(4);

  useEffect(() => {
    const updateMidColumn = () => {
      if (window.innerWidth <= 320) {
        setMidColumn(1); // MobileS_max breakpoint (320px) uses 2 columns, so middle is 1
      } else if (window.innerWidth <= 425) {
        setMidColumn(2); // MobileL_max breakpoint (425px) uses 4 columns, so middle is 2
      } else {
        setMidColumn(4); // Desktop version uses 8 columns, so middle is 4
      }
    };

    updateMidColumn(); // Initial check
    window.addEventListener("resize", updateMidColumn);

    return () => window.removeEventListener("resize", updateMidColumn);
  }, []);

  useEffect(() => {
    const items = new Array(TOTAL_CELLS).fill(null);
    const usedIndices = new Set();

    // Randomly place category items
    categories.forEach((category) => {
      let index;
      do {
        index = Math.floor(Math.random() * TOTAL_CELLS);
      } while (usedIndices.has(index));

      usedIndices.add(index);
      items[index] = { type: "category", ...category };
    });

    // Fill remaining slots with numbered placeholders
    items.forEach((_, i) => {
      if (!items[i]) {
        items[i] = { type: "number", number: i + 1 };
      }
    });

    setGridItems(items);
  }, []);

  return (
    <Container>
      {gridItems.map((item, index) => {
        const columnIndex =
          index %
          (window.innerWidth <= 320 ? 2 : window.innerWidth <= 425 ? 4 : 8);
        const isReversed = columnIndex < midColumn;

        return (
          <Item key={index}>
            {item.type === "category" ? (
              <Link href={item.link}>
                <div className="title">{item.name}</div>
                <StyledImage
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Image
                  src={tvStatic}
                  alt="tv static"
                  fill
                  sizes="(max-width: 768px) 100vw,
                                         (max-width: 1200px) 50vw,
                                         33vw"
                  unoptimized
                />
              </Link>
            ) : (
              <Cell $isReversed={isReversed}>{item.number}</Cell>
            )}
          </Item>
        );
      })}
    </Container>
  );
};

export default Mobile;
