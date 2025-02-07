import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import * as _var from "@/styles/variables";

import universeSimulation from "../../public/images/categories/universeSimulation.jpg";
import electricity from "../../public/images/categories/electricity.jpg";
import glassBox from "../../public/images/categories/glassBox.jpg";
import temporalDrift from "../../public/images/categories/temporalDrift.jpg";
import theThinBlueLie from "../../public/images/categories/theThinBlueLie.jpg";

const ROWS_AMOUNT = 20;
const ROW_REM = 8;
const EXPAND_PX = "10vw";

const columns = ["1fr"];
for (let i = 1; i < ROWS_AMOUNT; i++) {
  columns.push(`${(1 - i * 0.05).toFixed(2)}fr`);
}

const combinedColumns = [...columns, ...columns.slice().reverse()];
const totalColumns = combinedColumns.length;

const Container = styled.div`
  padding-top: ${_var.headerHeight};
  width: 100%;
  height: calc(100vh - ${_var.headerHeight});
  display: grid;
  grid-template-columns: ${(props) => props.$gridTemplate};
  grid-auto-rows: calc((calc(100vh - ${_var.headerHeight})) / ${ROW_REM});
  transition: grid-template-columns 150ms ease-in-out;
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  border: 0.25px solid ${_var.primary_010};
  background: ${(props) =>
    props.$isCategorized ? `${_var.primary_010}` : `${_var.primary_100}`};
  cursor: pointer;
  z-index: 0;

  &:hover {
    z-index: 10;
  }

  & div {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 8px;
    font-size: 12px;
    text-align: ${(props) => (props.$isReversed ? "right" : "left")};
    text-transform: uppercase;
    color: ${(props) => (props.$isCategorized ? `${_var.primary_090}` : "")};
    white-space: nowrap;
  }
`;

const Placeholder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${_var.primary_010};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & div:first-child {
    z-index: 1;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const categories = [
    {
      type: "moving through space and time",
      img: universeSimulation,
      link: "/moving-through-space-and-time",
    },
    { type: "Electricity", img: electricity, link: "/electricity" },
    { type: "Glass Box", img: glassBox, link: "/glass-box" },
    { type: "Temporal Drift", img: temporalDrift, link: "/temporal-drift" },
    {
      type: "The Thin Blue Lie",
      img: theThinBlueLie,
      link: "/police-brutality",
    },
  ];

  const arr = Array.from(Array(ROWS_AMOUNT * (ROW_REM * 2)).keys());
  const [randomCategoryMap, setRandomCategoryMap] = useState(new Map());

  useEffect(() => {
    const newCategoryMap = new Map();
    const highlightIndices = new Set();

    // Calculate center column range
    const centerStart = Math.floor(totalColumns / 2) - 2; // Adjust if needed
    const centerEnd = Math.floor(totalColumns / 2) + 1; // 4 center columns

    // Get only valid positions outside the center columns
    const validPositions = arr.filter((index) => {
      const column = index % totalColumns;
      return column < centerStart || column > centerEnd;
    });

    while (
      newCategoryMap.size < categories.length &&
      validPositions.length > 0
    ) {
      const randomIndex = Math.floor(Math.random() * validPositions.length);
      const selectedIndex = validPositions.splice(randomIndex, 1)[0];

      newCategoryMap.set(selectedIndex, categories[newCategoryMap.size]);
    }

    setRandomCategoryMap(newCategoryMap);
  }, []);

  // Compute stable baseline column sizes (ensuring it always sums to 100vw)
  const totalFr = combinedColumns.reduce(
    (sum, val) => sum + parseFloat(val),
    0
  );
  const baseColumnSizes = combinedColumns.map(
    (size) => (parseFloat(size) / totalFr) * 100
  ); // Convert fr to %

  // Compute adjusted grid-template-columns dynamically
  const gridTemplate = baseColumnSizes
    .map((size, index) => {
      if (hoveredColumn === null) {
        return `${size}%`; // No column hovered, normal layout
      }
      if (index === hoveredColumn) {
        return `calc(${size}% + ${EXPAND_PX})`; // Expand hovered column by 10vw
      } else {
        return `calc(${size}% - (${EXPAND_PX} / (${totalColumns} - 1)))`; // Shrink others evenly
      }
    })
    .join(" ");

  return (
    <Container $gridTemplate={gridTemplate}>
      {arr.map((item) => {
        const column = item % totalColumns;
        const isReversed = column > columns.length;
        const isCategorized = randomCategoryMap.has(item);
        const category = randomCategoryMap.get(item) || "";

        return (
          <Item
            key={item}
            $isReversed={isReversed}
            $isCategorized={isCategorized}
            onClick={() => setSelectedCategory(category.type)}
            onMouseEnter={() => setHoveredColumn(column)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            {isCategorized ? (
              <Link href={category.link}>
                <Placeholder>
                  <div>{category.type}</div>
                  <ImgContainer>
                    <Image
                      key={category.type}
                      src={category.img}
                      alt={category.type}
                      placeholder="blur"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </ImgContainer>
                </Placeholder>
              </Link>
            ) : (
              <div>({item})</div>
            )}
          </Item>
        );
      })}
    </Container>
  );
}
