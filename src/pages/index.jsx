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

// Adjust these as needed
const ROWS_AMOUNT = 10;
const COLS_AMOUNT = 10;
const EFFECT_AMOUNT = 9;

// Generate symmetrical columns
const cols = ["1fr"];
for (let i = 1; i < COLS_AMOUNT; i++) {
  // Decrease each next column by EFFECT_AMOUNT% (or to taste)
  cols.push(`${(1 - i * (EFFECT_AMOUNT / 100)).toFixed(2)}fr`);
}
const combinedColumns = [...cols.slice().reverse(), ...cols];

// Generate symmetrical rows
const rows = ["1fr"];
for (let i = 1; i < ROWS_AMOUNT; i++) {
  rows.push(`${(1 - i * (EFFECT_AMOUNT / 100)).toFixed(2)}fr`);
}
const combinedRows = [...rows.slice().reverse(), ...rows];

// This is the total grid cells
const totalCells = combinedColumns.length * combinedRows.length;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: ${_var.headerHeight};
  display: grid;

  /* Dynamically adjust columns */
  grid-template-columns: ${({ $hoveredColumn }) =>
    combinedColumns
      .map((col, index) => (index === $hoveredColumn ? "3fr" : col))
      .join(" ")};

  /* Dynamically adjust rows */
  grid-template-rows: ${({ $hoveredRow }) =>
    combinedRows
      .map((row, index) => (index === $hoveredRow ? "2fr" : row))
      .join(" ")};

  transition: grid-template-columns 150ms ${_var.cubicBezier},
    grid-template-rows 150ms ${_var.cubicBezier};
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  background: ${(props) =>
    props.$isCategorized ? _var.primary_010 : _var.primary_100};
  cursor: pointer;
  z-index: 0;

  /* We still keep a default <div> for the categorized text overlay */
  & div {
    position: absolute;
    width: 100%;
    font-size: 12px;
    text-transform: uppercase;
    color: ${({ $isCategorized }) => ($isCategorized ? _var.primary_090 : "")};
    white-space: nowrap;
    padding: ${({ $isCategorized }) => ($isCategorized ? "4px" : "")};
  }

  /* Our .cell class will handle X/Y alignment logic */
  & .cell {
    /* Absolutely position the text in the cell */
    position: absolute;

    /* If $isBottom, place at bottom; else top */
    ${({ $isBottom }) => ($isBottom ? "bottom: 0;" : "top: 0;")}

    /* If $isReversed, align right; else left */
    text-align: ${({ $isReversed }) => ($isReversed ? "right" : "left")};
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

  // Make an array of all cells
  const cellsArray = Array.from(Array(totalCells).keys());

  // For convenience
  const numCols = combinedColumns.length;

  // We'll use this to figure out the boundary between reversed vs. original columns
  const leftSideLength = cols.length; // e.g. 10 if COLS_AMOUNT=10
  const topSideLength = rows.length; // e.g. 10

  // Randomly place categories
  const [randomCategoryMap, setRandomCategoryMap] = useState(new Map());

  useEffect(() => {
    const newCategoryMap = new Map();
    const usedIndices = new Set();

    while (newCategoryMap.size < categories.length) {
      const randomIndex = Math.floor(Math.random() * cellsArray.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        newCategoryMap.set(randomIndex, categories[newCategoryMap.size]);
      }
    }

    setRandomCategoryMap(newCategoryMap);
  }, [cellsArray.length]);

  return (
    <Container $hoveredRow={hoveredRow} $hoveredColumn={hoveredColumn}>
      {cellsArray.map((cell, index) => {
        // Row and column in the symmetrical grid
        const rowIndex = Math.floor(index / numCols);
        const columnIndex = index % numCols;

        // X-axis "isReversed" => left half is reversed
        const isReversed = columnIndex < leftSideLength;
        // Y-axis "isBottom" => if we are in the bottom half
        // combinedRows = reversed + original
        // => rowIndex >= topSideLength => bottom half
        const isBottom = rowIndex >= topSideLength;

        // Check if cell is assigned a category
        const isCategorized = randomCategoryMap.has(cell);
        const category = randomCategoryMap.get(cell) || null;

        return (
          <Item
            key={index}
            $isCategorized={isCategorized}
            $isReversed={!isReversed}
            $isBottom={isBottom}
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
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                  />
                </Placeholder>
              </Link>
            ) : (
              <div className="cell">({cell})</div>
            )}
          </Item>
        );
      })}
    </Container>
  );
}
