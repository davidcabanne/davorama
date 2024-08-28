import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import * as _var from "../../styles/variables";

import { Section } from "../../components/sections/Section";

import tvSet from "../../../public/images/electricity/tvset.png";

const StyledSection = styled(Section)`
  position: relative;
  height: 100vh;
  background: white;

  & > div {
    z-index: 1;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & img,
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & img {
    filter: grayscale(0.75);
  }

  & audio {
    display: none;
  }
`;

const DoubledImage = styled(Image)`
  opacity: 0.5;
  z-index: 5;
`;

const Subtitle = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: ${_var.spaceM};
  z-index: 5;

  & p {
    position: absolute;
    color: yellow;
    font-size: ${_var.spaceM};
    font-style: italic;
    z-index: 10;
  }
  & :nth-child(2) {
    -webkit-text-stroke: 8px black;
    z-index: 9;
  }
`;

const Electricity = () => {
  const audioPlayerRef = useRef(null);
  const videoBrutalityRef = useRef(null);
  const videoStaticsRef = useRef(null);
  const videoPowerPoleRef = useRef(null);

  const [active, setActive] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [gain, setGain] = useState(0);
  const [size, setSize] = useState(1);

  useEffect(() => {
    if (audioPlayerRef.current) {
      // Create a new AudioContext
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);

      // Create an analyser node
      const analyserNode = context.createAnalyser();
      setAnalyser(analyserNode);

      // Create a MediaElementAudioSourceNode
      const source = context.createMediaElementSource(audioPlayerRef.current);

      // Connect the source to the analyser
      source.connect(analyserNode);

      // Connect the analyser to the context's destination (the speakers)
      analyserNode.connect(context.destination);

      // Set up the data array for the analyser
      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      setDataArray(dataArray);
    }
  }, []);

  const handleTogglePlay = () => {
    if (audioPlayerRef.current && videoBrutalityRef.current && !active) {
      audioPlayerRef.current.play();
      videoBrutalityRef.current.play();
      videoStaticsRef.current.play();
      videoPowerPoleRef.current.play();
      setActive(!active);

      // Start analyzing the gain/volume
      if (audioContext) {
        audioContext.resume();
        analyzeGain();
      }
    } else if (audioPlayerRef.current && videoBrutalityRef.current && active) {
      audioPlayerRef.current.pause();
      videoBrutalityRef.current.pause();
      videoStaticsRef.current.pause();
      videoPowerPoleRef.current.pause();
      setActive(!active);

      if (audioContext) {
        audioContext.suspend();
      }
    }
  };

  const analyzeGain = () => {
    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);

      // Calculate the average volume (gain) from the frequency data
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;

      // Convert the average to an integer
      const averageInt = Math.round(average); // or Math.floor(average) / Math.ceil(average)

      setGain(averageInt);
      setSize((100 - averageInt) / 100);

      // Call analyzeGain again in the next frame
      requestAnimationFrame(analyzeGain);
    }
  };

  return (
    <StyledSection>
      <Placeholder onClick={handleTogglePlay}>
        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#7DF9FF",
            mixBlendMode: "color-burn",
            opacity: gain / 100,
            zIndex: 4,
          }}
        ></div>

        {/* TV SET IMAGES */}
        <DoubledImage
          src={tvSet}
          fill
          alt="tvset"
          style={{
            opacity: gain / 100,
            transform: `translateX(${gain}px) translateY(${gain}px)`,
            mixBlendMode: "color-burn",
            filter: `blur(${gain / 10}px)`,
          }}
        />
        <DoubledImage
          src={tvSet}
          fill
          alt="tvset"
          style={{
            opacity: gain / 100,
            transform: `translateX(-${gain}px) translateY(-${gain}px)`,
            filter: `blur(${gain / 10}px)`,
          }}
        />
        <Image src={tvSet} fill alt="tvset" />

        {/* VIDEO TEXTURED */}
        <video
          ref={videoBrutalityRef}
          playsInline
          muted
          loop
          style={{ mixBlendMode: "hue", zIndex: 1 }}
        >
          <source src="videos/brutality.mp4" type="video/mp4" />
        </video>

        {/* VIDEO STATICS */}
        <video
          ref={videoStaticsRef}
          playsInline
          muted
          loop
          style={{
            mixBlendMode: "color-dodge",
            opacity: gain / 100,
            zIndex: -1,
          }}
        >
          <source src="videos/statics.mp4" type="video/mp4" />
        </video>

        {/* VIDEO POWER POLE */}
        <video
          ref={videoPowerPoleRef}
          playsInline
          muted
          loop
          style={{
            zIndex: -2,
            filter: `blur(${gain / 10}px)`,
            transform: `scale(${size})`,
          }}
        >
          <source src="videos/powerPole.mp4" type="video/mp4" />
        </video>

        {/* AUDIO */}
        <audio ref={audioPlayerRef} controls src="./audios/radioWaves.mp3"></audio>

        {/* SUBTITLES */}
        <Subtitle
          style={{
            transform: `translateY(-${gain / 2}px)`,
            filter: `blur(${gain / 10}px)`,
          }}
        >
          <p>Electricity</p>
          <p>Electricity</p>
        </Subtitle>
      </Placeholder>
    </StyledSection>
  );
};

export default Electricity;
