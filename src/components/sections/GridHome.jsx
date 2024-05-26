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

export default function GridHome({ posts }) {
  return (
    <Container id="grid">
      {posts?.map((post, index) => {
        return (
          <Placeholder
            key={post?.slug + index}
            href={`${post.slug}`}
            $index={index}
          >
            <Title card>{post.title}</Title>
            <Image
              src={post?.href}
              alt={post?.title}
              // placeholder="blur"
              fill={true}
              // blurDataURL={post?.mainImage.asset.metadata.lqip}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Placeholder>
        );
      })}
    </Container>
  );
}
