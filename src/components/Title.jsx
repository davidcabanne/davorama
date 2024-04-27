import React from 'react';
import styled from 'styled-components';
import * as _var from '../styles/variables';

const Container = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: ${_var.spaceS};

  // prevent <Title /> to appear on mobile
  & div {
    opacity: 0;
  }

  ${(props) =>
    props.$card
      ? `
    @media ${_var.device.tablet_min} {
      & div {
      opacity: 0;
      transform: translateY(8px);
      transition: 200ms ${_var.cubicBezier};
      transition-property: opacity, transform;
      }
      &:hover div {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  `
      : ''}
`;

const Name = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    width: 100%;
  }

  & :nth-child(1) {
    color: yellow;
    z-index: 1;
  }
  & :nth-child(2) {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-text-stroke: 3px black;
    text-stroke: 3px black;
    z-index: 0;
  }
`;

const Title = ({ children, card, ...props }) => {
  return (
    <Container $card={card} {...props}>
      <Name>
        <span>{children}</span>
        <span>{children}</span>
      </Name>
    </Container>
  );
};

export default Title;
