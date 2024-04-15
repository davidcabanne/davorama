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
  padding-top: 2px;
  background: white;

  @media ${_var.device.tablet_max} {
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  }
`;

const Placeholder = styled(Link)`
  position: relative;
  width: 100%;
  aspect-ratio: 3601 / 2433;

  & img {
    position: absolute;
    inset: 0;
    object-fit: cover;
  }
`;

export default function Grid({ posts }) {
  return (
    <Container>
      {posts?.map((post) => {
        return (
          <Placeholder
            key={post?.id}
            href={`/post/${encodeURIComponent(post.slug.current)}`}
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
