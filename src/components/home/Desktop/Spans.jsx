import React from "react";
import styled from "styled-components";
import * as _var from "@/styles/variables";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & span {
    position: absolute;
    background: ${_var.primary_010};
  }

  & span:nth-child(1) {
    top: 0;
    left: 0;
    width: 8px;
    height: 1px;
  }
  & span:nth-child(2) {
    top: 0;
    left: 0;
    width: 1px;
    height: 8px;
  }
  & span:nth-child(3) {
    top: 0;
    right: 0;
    width: 8px;
    height: 1px;
  }
  & span:nth-child(4) {
    top: 0;
    right: 0;
    width: 1px;
    height: 8px;
  }
  & span:nth-child(5) {
    bottom: 0;
    left: 0;
    width: 8px;
    height: 1px;
  }
  & span:nth-child(6) {
    bottom: 0;
    left: 0;
    width: 1px;
    height: 8px;
  }
  & span:nth-child(7) {
    bottom: 0;
    right: 0;
    width: 8px;
    height: 1px;
  }
  & span:nth-child(8) {
    bottom: 0;
    right: 0;
    width: 1px;
    height: 8px;
  }

  /* &:hover {
    & span {
      display: block;
    }
  } */
`;

const Spans = () => {
  return (
    <Container>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </Container>
  );
};

export default Spans;
