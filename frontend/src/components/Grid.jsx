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

  @media ${_var.device.tablet_max} {
    grid-template-columns: 1fr;
  }
`;

const Placeholder = styled(Link)`
  position: relative;
  width: 100%;
  aspect-ratio: 3601 / 2433;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
  overflow: hidden;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
  }

  // => <Title />
  & :nth-child(1) {
    z-index: 3;
  }

  // => <Image />
  & :nth-child(2) {
    z-index: 0;
  }

  // => <Image />
  & :nth-child(3) {
    filter: grayscale(1);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    z-index: -1;
  }
`;

export default function Grid({ posts }) {
  const [columns, setColumns] = useState(2);

  // Initialize with 0% visible
  const [visible, setVisible] = useState(new Array(posts.length).fill(0));
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
        rootMargin: '0px',
        // Generate thresholds from 0 to 1 at 0.01 intervals
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      },
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

  const isLastItemFullWidth = posts.length % columns === 1;

  return (
    <Container>
      {posts?.map((post, index) => {
        // const rotation = 10 * (1 - visible[index]);
        // const perspective = '2000px';
        // const scale = '1.05';
        return (
          <Placeholder
            key={post?.id}
            href={`/post/${encodeURIComponent(post.slug.current)}`}
            $fullWidth={isLastItemFullWidth && index === posts.length - 1}
            ref={(el) => (placeholdersRef.current[index] = el)}
          >
            <Title card>{post.title}</Title>
            <Image
              src={post?.mainImage.asset.url}
              alt={post?.title}
              placeholder="blur"
              fill={true}
              blurDataURL={post?.mainImage.asset.metadata.lqip}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                opacity: 0.25 + visible[index],
                // transform: `perspective(${perspective}) rotateX(${rotation}deg) scale(${scale})`,
              }}
            />
            <Image
              src={post?.mainImage.asset.url}
              alt={post?.title}
              placeholder="blur"
              fill={true}
              blurDataURL={post?.mainImage.asset.metadata.lqip}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                opacity: 1 - visible[index],
                // transform: `perspective(${perspective}) rotateX(${rotation}deg) scale(${scale})`,
              }}
            />
          </Placeholder>
        );
      })}
    </Container>
  );
}
