import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import * as variables from "../../styles/variables";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px ${variables.spaceLarge};
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  mix-blend-mode: multiply;
  filter: saturate(1);

  transition: opacity 200ms ease-in-out;

  &.none {
    opacity: 0;
  }

  &.opacity {
    opacity: 1;
  }

  &.mixBlend {
    mix-blend-mode: difference;
  }
`;

const fade_in = keyframes`
0% {
  opacity: 0;
}
50%{
  opacity: 1;
}
100% {
  opacity: 0;
}
`;

const fade_out = keyframes`
0% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`;

const Glitch = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 10;
  pointer-events: none;

  &.active {
    animation: ${fade_in} 300ms ${variables.animationBezier} forwards;
  }
  &.inactive {
    animation: ${fade_out} 300ms ${variables.animationBezier} forwards;
  }
`;

const TemporalDrift = () => {
  // USE-REFs
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  // USE-STATEs
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const delay = 0.025;

  useEffect(() => {
    const timecode = 0;
    const start = timecode;
    const end = timecode + 10;

    if (firstRef.current && secondRef.current && thirdRef.current) {
      // playbackRate
      firstRef.current.playbackRate = 1;
      secondRef.current.playbackRate = 1 + delay;
      thirdRef.current.playbackRate = 1 - delay;

      // volume
      firstRef.current.volume = 0.5;
      secondRef.current.volume = 0.5;
      thirdRef.current.volume = 0.5;

      const firstTimeUpdate = () => {
        if (firstRef.current && firstRef.current.currentTime >= end) {
          firstRef.current.currentTime = start;
        }
      };

      const secondTimeUpdate = () => {
        if (secondRef.current && secondRef.current.currentTime >= end) {
          secondRef.current.currentTime = start;
        }
      };

      const thirdTimeUpdate = () => {
        if (thirdRef.current && thirdRef.current.currentTime >= end) {
          thirdRef.current.currentTime = start;
        }
      };

      firstRef.current.addEventListener("timeupdate", firstTimeUpdate, false);
      secondRef.current.addEventListener("timeupdate", secondTimeUpdate, false);
      thirdRef.current.addEventListener("timeupdate", thirdTimeUpdate, false);

      firstRef.current.currentTime = start;
      secondRef.current.currentTime = start;
      thirdRef.current.currentTime = start;
    }

    return () => {
      // Cleanup: Pause the videos and remove event listeners on unmount
      if (firstRef.current && secondRef.current && thirdRef.current) {
        firstRef.current.pause();
        secondRef.current.pause();
        thirdRef.current.pause();

        firstRef.current.removeEventListener("timeupdate", firstTimeUpdate);
        secondRef.current.removeEventListener("timeupdate", secondTimeUpdate);
        thirdRef.current.removeEventListener("timeupdate", thirdTimeUpdate);
      }
    };
  }, [firstRef, secondRef, thirdRef]);

  useEffect(() => {
    if (isPlaying) {
      firstRef.current.play();
      secondRef.current.play();
      thirdRef.current.play();
    } else {
      firstRef.current.pause();
      secondRef.current.pause();
      thirdRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlay = (event) => {
    setIsPlaying(!isPlaying);
  };

  const handleHover = (event) => {
    setIsHovered(true);
    firstRef.current.playbackRate = 1.0 - 0.7;
    secondRef.current.playbackRate = 1 + delay - 0.7;
    thirdRef.current.playbackRate = 1 - delay - 0.7;
  };

  const handleLeave = (event) => {
    setIsHovered(false);
    firstRef.current.playbackRate = 1;
    secondRef.current.playbackRate = 1 + delay;
    thirdRef.current.playbackRate = 1 - delay;
  };

  const handleAudioContext = (event) => {
    let ctx = new AudioContext();
  };

  return (
    <>
      <Container
        onClick={(event) => {
          handleAudioContext(event);
        }}
      >
        <Wrapper
          onClick={(event) => {
            handlePlay(event);
          }}
          onMouseEnter={(event) => {
            handleHover(event);
          }}
          onMouseLeave={(event) => {
            handleLeave(event);
          }}
        >
          <Video
            ref={firstRef}
            src="/videos/temporalDrift.mp4"
            autoPlay
            loop
            playsInline
            controls=""
            style={{ mixBlendMode: "overlay" }}
          />
          <Video
            ref={secondRef}
            src="/videos/temporalDrift.mp4"
            autoPlay
            loop
            playsInline
            controls=""
            style={{ mixBlendMode: "overlay" }}
          />
          <Video
            ref={thirdRef}
            src="/videos/temporalDrift.mp4"
            autoPlay
            loop
            playsInline
            controls=""
            style={{ mixBlendMode: "multiply" }}
          />
        </Wrapper>
      </Container>
    </>
  );
};

export default TemporalDrift;
