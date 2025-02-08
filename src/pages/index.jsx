import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import * as _var from "@/styles/variables";

import universeSimulation from "../../public/images/categories/universeSimulation.jpg";
import electricity from "../../public/images/categories/electricity.jpg";
import glassBox from "../../public/images/categories/glassBox.jpg";
import temporalDrift from "../../public/images/categories/temporalDrift.jpg";
import theThinBlueLie from "../../public/images/categories/theThinBlueLie.jpg";

const ROWS_AMOUNT = 20; // Total number of rows
const ROW_REM = 8; // Number of rows per screen height

const columns = ["1fr"];
for (let i = 1; i < ROWS_AMOUNT; i++) {
  columns.push(`${(1 - i * 0.05).toFixed(2)}fr`);
}

// Symmetrical columns: decrease, then increase
const combinedColumns = [...columns, ...columns.slice().reverse()];

const Container = styled.div`
  padding-top: ${_var.headerHeight};
  width: 100%;
  height: calc(100vh - ${_var.headerHeight});
  display: grid;

  /* Dynamically adjust columns */
  grid-template-columns: ${({ hoveredColumn }) =>
    combinedColumns
      .map(
        (col, index) => (index === hoveredColumn ? "3fr" : col) // Hovered column expands
      )
      .join(" ")};

  /* Dynamically adjust rows */
  grid-template-rows: ${({ hoveredRow }) =>
    Array.from({ length: ROWS_AMOUNT })
      .map(
        (_, index) =>
          index === hoveredRow
            ? `calc((100vh - ${_var.headerHeight}) / ${ROW_REM} * 2)` // Expanded row height
            : `calc((100vh - ${_var.headerHeight}) / ${ROW_REM})` // Default row height
      )
      .join(" ")};

  transition: grid-template-columns 100ms ease,
    grid-template-rows 100ms ${_var.cubicBezier};
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${_var.primary_090};
  background: ${(props) =>
    props.$isCategorized ? `${_var.primary_010}` : `${_var.primary_100}`};
  cursor: pointer;
  z-index: 0;

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

  & div {
    z-index: 1;
  }

  & img {
    position: absolute;
    inset: 0;
    min-width: 10vw;
    object-fit: cover;
  }
`;

export default function Home() {
  const [hoveredRow, setHoveredRow] = useState(null);
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
  const totalColumns = combinedColumns.length;

  const [randomCategoryMap, setRandomCategoryMap] = useState(new Map());

  useEffect(() => {
    const newCategoryMap = new Map();
    const highlightIndices = new Set();

    while (newCategoryMap.size < categories.length) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!highlightIndices.has(randomIndex)) {
        highlightIndices.add(randomIndex);
        newCategoryMap.set(randomIndex, categories[newCategoryMap.size]);
      }
    }

    setRandomCategoryMap(newCategoryMap);
  }, [arr.length]);

  return (
    <Container hoveredRow={hoveredRow} hoveredColumn={hoveredColumn}>
      {arr.map((item, index) => {
        const rowIndex = Math.floor(index / totalColumns);
        const columnIndex = index % totalColumns;
        const isCategorized = randomCategoryMap.has(item);
        const category = randomCategoryMap.get(item) || "";

        return (
          <Item
            key={index}
            $isCategorized={isCategorized}
            onMouseEnter={() => {
              setHoveredRow(rowIndex);
              setHoveredColumn(columnIndex);
            }}
            onMouseLeave={() => {
              setHoveredRow(null);
              setHoveredColumn(null);
            }}
          >
            {isCategorized ? (
              <Link href={category.link}>
                <Placeholder>
                  <div>{category.type}</div>
                  <Image
                    key={category.type}
                    src={category.img}
                    alt={category.type}
                    placeholder="blur"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
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
