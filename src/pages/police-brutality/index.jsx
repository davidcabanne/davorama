import React from "react";
import styled from "styled-components";
import * as _var from "../../styles/variables";

import videoPoster from "../../../public/videos/brutalityPoster.jpg";

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;

  & video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
`;

const Text = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${_var.spaceXL} ${_var.spaceS};

  @media ${_var.device.tablet_max} {
    padding: ${_var.spaceL} ${_var.spaceS};
  }

  & p {
    position: relative;
    color: white;
    background: red;
    font-size: clamp(64px, 5vw, 128px);
    text-align: center;
    mix-blend-mode: difference;
    filter: blur(4px);
    padding: 8px 32px;
    z-index: 5;
    pointer-events: none;
  }
`;

const PoliceBrutality = () => {
  return (
    <Container>
      <Text>
        <p>The Thin Blue Lie</p>
      </Text>
      <video playsInline autoPlay muted loop poster={videoPoster}>
        <source src="videos/brutality.mp4" type="video/mp4" />
      </video>
    </Container>
  );
};

export default PoliceBrutality;
