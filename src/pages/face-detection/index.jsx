import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as faceapi from "face-api.js";
import styled from "styled-components";

import { Section } from "@/components/sections/Section";
import { slowMovement, erraticMovement } from "./keyframes";

import twinPeaksRoom from "../../../public/images/face-detection/twinPeaksRoom.jpg";
import twinPeaksRoomActive from "../../../public/images/face-detection/twinPeaksRoomActive.jpg";

const StyledSection = styled(Section)`
  height: 100vh;

  & img {
    object-fit: cover;
  }

  & audio {
    display: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: #080202;
    opacity: 0.5;
    transition: 150ms opacity ease-in-out;
  }

  &.active {
    &::after {
      opacity: 0;
    }
  }
`;

const ActiveImageDouble = styled(Image)`
  opacity: 0;
  transition: 150ms opacity ease-in-out;
  animation: ${erraticMovement} 500ms infinite alternate reverse;

  &.active {
    opacity: 0.25;
  }
`;

const ActiveImage = styled(Image)`
  opacity: 0;
  transition: 150ms opacity ease-in-out;
  animation: ${erraticMovement} 500ms infinite alternate;

  &.active {
    opacity: 1;
  }
`;

const BackgroundImage = styled(Image)`
  animation: ${slowMovement} 120000ms infinite alternate;
`;

const WebcamCapture = () => {
  const audioPlayerRef = useRef(null);
  const audioEffectPlayerRef = useRef(null);
  const videoElementRef = useRef(null);

  const [active, setActive] = useState(true); // Start with `true` to keep animations running until the stream is ready
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    let stream;

    const loadModelsAndStartDetection = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.createElement("video");
        videoElement.srcObject = stream;
        videoElement.play();
        videoElementRef.current = videoElement;

        videoElement.onloadeddata = () => {
          setLoading(false); // Stream is loaded, stop showing the animation
        };

        const detectFace = async () => {
          const detections = await faceapi
            .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

          if (detections.length > 0) {
            const landmarks = detections[0].landmarks;
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();
            const nose = landmarks.getNose();

            const eyeCenter = (leftEye[3].x + rightEye[0].x) / 2;
            const noseCenter = nose[3].x;

            setActive(Math.abs(eyeCenter - noseCenter) < 10);
          } else {
            setActive(false);
          }
        };

        const intervalId = setInterval(detectFace, 100);

        return () => {
          clearInterval(intervalId);
          stream.getTracks().forEach((track) => track.stop());
        };
      } catch (err) {
        console.error("Error accessing webcam: ", err);
        setLoading(false); // In case of error, stop showing the animation
      }
    };

    loadModelsAndStartDetection();

    // Play audio on loop when component loads
    if (audioPlayerRef.current) {
      audioPlayerRef.current.loop = true; // Ensure the audio plays on loop
      audioPlayerRef.current.volume = 0.5; // Set volume to 50% (you can adjust this value)
      audioPlayerRef.current.play().catch((err) => {
        console.error("Error playing audio: ", err);
      });
    }
    // Play audio on loop when component loads
    if (audioEffectPlayerRef.current) {
      audioEffectPlayerRef.current.loop = true;
      audioEffectPlayerRef.current.volume = 0;
      audioEffectPlayerRef.current.play().catch((err) => {
        console.error("Error playing audio: ", err);
      });
    }

    return () => {
      // Cleanup: Stop the video stream when component unmounts or page changes
      if (videoElementRef.current) {
        videoElementRef.current.pause();
        if (videoElementRef.current.srcObject) {
          videoElementRef.current.srcObject.getTracks().forEach((track) => {
            track.stop();
          });
        }
        videoElementRef.current.srcObject = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioEffectPlayerRef.current && !active) {
      audioEffectPlayerRef.current.volume = 1;
    }
    if (audioEffectPlayerRef.current && active) {
      audioEffectPlayerRef.current.volume = 0;
    }
  }, [active]);

  return (
    <StyledSection>
      <Overlay className={active ? "active" : ""} />
      <ActiveImageDouble
        src={twinPeaksRoomActive}
        alt="twin peaks room"
        fill
        className={!active && !loading ? "active" : ""}
        style={{ zIndex: 2 }}
      />
      <ActiveImage
        src={twinPeaksRoomActive}
        alt="twin peaks room"
        fill
        className={!active && !loading ? "active" : ""}
        style={{ zIndex: 1 }}
      />
      <BackgroundImage
        src={twinPeaksRoom}
        alt="twin peaks room"
        fill
        style={{ zIndex: 0 }}
      />
      <audio ref={audioEffectPlayerRef} controls src="./powerSurge.mp3"></audio>
      <audio ref={audioPlayerRef} controls src="./powerlineTension.mp3"></audio>
    </StyledSection>
  );
};

export default WebcamCapture;
