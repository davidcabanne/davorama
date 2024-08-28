import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import * as _var from "../../styles/variables";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px ${_var.spaceL};
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
`;

const TemporalDrift = () => {
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const delay = 0.025;

  // Define a generalized time update function
  const timeUpdate = (videoRef, start, end) => {
    if (videoRef.current && videoRef.current.currentTime >= end) {
      videoRef.current.currentTime = start;
    }
  };

  useEffect(() => {
    // Store the current ref values in variables
    const firstVideo = firstRef.current;
    const secondVideo = secondRef.current;
    const thirdVideo = thirdRef.current;

    const timecode = 0;
    const start = timecode;
    const end = timecode + 10;

    if (firstVideo && secondVideo && thirdVideo) {
      // playbackRate
      firstVideo.playbackRate = 1;
      secondVideo.playbackRate = 1 + delay;
      thirdVideo.playbackRate = 1 - delay;

      // volume
      firstVideo.volume = 0.5;
      secondVideo.volume = 0.5;
      thirdVideo.volume = 0.5;

      // Bind the event listeners, passing the start and end values
      firstVideo.addEventListener(
        "timeupdate",
        () => timeUpdate(firstRef, start, end),
        false
      );
      secondVideo.addEventListener(
        "timeupdate",
        () => timeUpdate(secondRef, start, end),
        false
      );
      thirdVideo.addEventListener(
        "timeupdate",
        () => timeUpdate(thirdRef, start, end),
        false
      );

      firstVideo.currentTime = start;
      secondVideo.currentTime = start;
      thirdVideo.currentTime = start;
    }

    return () => {
      // Cleanup: Pause the videos and remove event listeners on unmount
      if (firstVideo && secondVideo && thirdVideo) {
        firstVideo.pause();
        secondVideo.pause();
        thirdVideo.pause();

        firstVideo.removeEventListener("timeupdate", () =>
          timeUpdate(firstRef, start, end)
        );
        secondVideo.removeEventListener("timeupdate", () =>
          timeUpdate(secondRef, start, end)
        );
        thirdVideo.removeEventListener("timeupdate", () =>
          timeUpdate(thirdRef, start, end)
        );
      }
    };
  }, [delay]);

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

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEnter = () => {
    firstRef.current.playbackRate = 1.0 - 0.7;
    secondRef.current.playbackRate = 1 + delay - 0.7;
    thirdRef.current.playbackRate = 1 - delay - 0.7;
  };

  const handleLeave = () => {
    firstRef.current.playbackRate = 1;
    secondRef.current.playbackRate = 1 + delay;
    thirdRef.current.playbackRate = 1 - delay;
  };

  return (
    <Container>
      <Wrapper
        onClick={handlePlay}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
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
  );
};

export default TemporalDrift;
