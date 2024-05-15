import React from "react";
import styled from "styled-components";
import * as _var from "../../styles/variables";

const Container = styled.section`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${_var.spaceL};
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  padding: ${_var.spaceL} ${_var.spaceS};

  & p {
    text-transform: uppercase;
    font-weight: 500;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const CapitalismContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;

  & p {
    line-height: 1;
    white-space: nowrap;
  }

  & div:nth-child(1) {
    position: relative;
  }

  & div:not(:nth-child(1)) {
    position: absolute;
  }
`;

const Works = () => {
  const generateParagraphs = (panelId) => {
    return [...Array(34).keys()].map((index) => {
      const style = {
        textTransform: "uppercase",
        fontWeight: 500,
        transform:
          panelId === "panel2" && index === 25 ? "translateX(56px)" : "",
      };
      return (
        <p key={index} style={style}>
          works
        </p>
      );
    });
  };

  const handleRenderParagraphs = (length) => {
    const text = Array.from({ length: length }, (_, i) => (
      <p key={i}>Capitalism Capitalism Capitalism Capitalism</p>
    ));

    const paragraphs = Array.from({ length: length / 2 }, (_, i) => (
      <div
        key={"p" + i}
        style={{ transform: `translateX(${16 * i}px) translateY(${16 * i}px)` }}
      >
        {text}
      </div>
    ));

    return <>{paragraphs}</>;
  };

  return (
    <Container>
      <Wrapper>
        <Panel>{generateParagraphs("panel1")}</Panel>
        <Panel>{generateParagraphs("panel2")}</Panel>
      </Wrapper>
    </Container>
  );
};

export default Works;
