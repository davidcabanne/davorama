import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

import * as _var from "../../styles/variables";

import Title from "../Title";

const gridMotion = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.015);
  }
  100% {
    opacity: 1;
    transform: scale(1.0);
  }
  `;

const Container = styled.section`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  background: ${_var.clr_dark};

  @media ${_var.device.tablet_max} {
    grid-template-columns: 1fr;
  }
`;

const Placeholder = styled(Link)`
  position: relative;
  width: 100%;
  aspect-ratio: 3601 / 2433;
  overflow: hidden;
  will-change: opacity;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
    opacity: 0;
    animation: 1000ms ${gridMotion} ${_var.cubicBezier} forwards;
    animation-delay: ${({ $index }) => `${$index * 25}ms`};
  }

  // Title
  & :nth-child(1) {
    z-index: 3;
  }

  // Image
  & :nth-child(2) {
    z-index: 0;
  }
`;

const Filter = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: grayscale(1);
  z-index: 2;
  will-change: opacity;
`;

export default function Grid({ posts }) {
  // Initialize with 0% visible
  const [visible, setVisible] = useState(new Array(posts.length).fill(0));
  const placeholdersRef = useRef(new Array(posts.length).fill(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = placeholdersRef.current.indexOf(entry.target);
          if (index !== -1) {
            // returns the % of the item that's visible
            const visibility = entry.intersectionRatio;
            setVisible((prev) => {
              const newVisible = [...prev];
              newVisible[index] = visibility;
              return newVisible;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        // Generate thresholds from 0 to 1 at 0.01 intervals
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      }
    );

    const currentPlaceholders = placeholdersRef.current;
    currentPlaceholders.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      currentPlaceholders.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [posts]);

  return (
    <Container id="grid">
      {posts?.map((post, index) => {
        return (
          <Placeholder
            key={post?.id}
            href={`/post/${encodeURIComponent(post.slug.current)}`}
            $index={index}
            ref={(el) => (placeholdersRef.current[index] = el)}
            style={{
              opacity: 0.75 + visible[index],
            }}
          >
            <Title card>{post.title}</Title>
            <Image
              src={post?.mainImage.asset.url}
              alt={post?.title}
              placeholder="blur"
              fill={true}
              blurDataURL={post?.mainImage.asset.metadata.lqip}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Filter
              style={{
                opacity: 1 - visible[index],
              }}
            />
          </Placeholder>
        );
      })}
    </Container>
  );
}
