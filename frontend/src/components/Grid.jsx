import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import * as _var from '../styles/variables';

import Title from './Title';

const Container = styled.section`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: black;

  @media ${_var.device.tablet_max} {
    grid-template-columns: 1fr;
  }
`;

const Placeholder = styled(Link)`
  position: relative;
  width: 100%;
  aspect-ratio: 3601 / 2433;
  grid-column: ${({ fullWidth }) => (fullWidth ? '1 / -1' : 'auto')};
  opacity: ${({ isVisible }) => 0.8 + isVisible};
  filter: ${({ isVisible }) => `grayscale(${1 - isVisible})`};
  overflow: hidden;

  transition: 50ms ${_var.cubicBezier};
  transition-property: opacity, filter, transform;
  transition-delay: 10ms;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
  }
`;

export default function Grid({ posts }) {
  const [columns, setColumns] = useState(2);
  const [visible, setVisible] = useState(new Array(posts.length).fill(false));
  const placeholdersRef = useRef(new Array(posts.length).fill(null));

  useEffect(() => {
    const handleResize = () => {
      setColumns(
        window.innerWidth <= parseInt(_var.device.tablet_max.replace('px', ''))
          ? 1
          : 2,
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = placeholdersRef.current.indexOf(entry.target);
          if (index !== -1) {
            setVisible((prev) => {
              const newVisible = [...prev];
              newVisible[index] = entry.intersectionRatio;
              return newVisible;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: buildThresholdList(),
      },
    );

    placeholdersRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      placeholdersRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [posts]);

  function buildThresholdList() {
    let thresholds = [];
    let numSteps = 1000; // Increase this number for smoother transitions

    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0); // Ensure we cover 0 to handle elements going out of view
    return thresholds;
  }

  const isLastItemFullWidth = posts.length % columns === 1;

  return (
    <Container>
      {posts?.map((post, index) => {
        return (
          <Placeholder
            key={post?.id}
            href={`/post/${encodeURIComponent(post.slug.current)}`}
            fullWidth={isLastItemFullWidth && index === posts.length - 1}
            isVisible={visible[index]}
            ref={(el) => (placeholdersRef.current[index] = el)}
          >
            <Image
              src={post?.mainImage.asset.url}
              alt={post?.title}
              placeholder="blur"
              fill={true}
              blurDataURL={post?.mainImage.asset.metadata.lqip}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Title card>{post.title}</Title>
          </Placeholder>
        );
      })}
    </Container>
  );
}
