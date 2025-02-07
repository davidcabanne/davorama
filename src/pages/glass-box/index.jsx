import React, { useState, useRef } from "react";
import Image from "next/image";
import * as faceapi from "face-api.js";
import styled from "styled-components";

import { Section } from "@/components/sections/Section";
import {
  slowMovement,
  erraticMovement,
} from "../../components/utils/keyframes";

import twinPeaksRoom from "../../../public/images/face-detection/twinPeaksRoom.jpg";
import twinPeaksRoomActive from "../../../public/images/face-detection/twinPeaksRoomActive.jpg";

const StyledSection = styled(Section)`
  height: 100vh;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  background: rgba(8, 2, 2, 0.5);
  transition: opacity 150ms ease-in-out;

  &.active {
    opacity: 0;
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

const GlassBox = () => {
  const audioPlayerRef = useRef(null); // Main background audio
  const audioEffectPlayerRef = useRef(null); // Effect audio
  const videoElementRef = useRef(null);
  const faceDetectionIntervalRef = useRef(null);

  const [isStarted, setIsStarted] = useState(false); // Controls the entire experience
  const [active, setActive] = useState(true); // Controls face tracking
  const [loading, setLoading] = useState(true);

  const toggleExperience = async () => {
    if (isStarted) {
      // 🛑 Stop Everything
      setIsStarted(false);
      setActive(true); // Reset face tracking

      if (audioPlayerRef.current) audioPlayerRef.current.pause();
      if (audioEffectPlayerRef.current) {
        audioEffectPlayerRef.current.pause();
        audioEffectPlayerRef.current.volume = 0; // Ensure effect sound stops
      }

      if (videoElementRef.current) {
        videoElementRef.current.pause();
        if (videoElementRef.current.srcObject) {
          videoElementRef.current.srcObject
            .getTracks()
            .forEach((track) => track.stop());
        }
        videoElementRef.current.srcObject = null;
      }

      if (faceDetectionIntervalRef.current) {
        clearInterval(faceDetectionIntervalRef.current);
      }

      return;
    }

    // ✅ Start Everything
    setIsStarted(true);

    // Load Face API models
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.play();
      videoElementRef.current = videoElement;

      videoElement.onloadeddata = () => setLoading(false);

      // Face Detection Function
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

          const isLooking = Math.abs(eyeCenter - noseCenter) < 10;
          setActive(isLooking);

          if (audioEffectPlayerRef.current) {
            audioEffectPlayerRef.current.volume = isLooking ? 0 : 1; // Effect sound plays only when NOT looking
          }
        } else {
          setActive(false);
          if (audioEffectPlayerRef.current) {
            audioEffectPlayerRef.current.volume = 1; // Effect sound plays when NO face detected
          }
        }
      };

      faceDetectionIntervalRef.current = setInterval(detectFace, 100);
    } catch (err) {
      console.error("Error accessing webcam: ", err);
      setLoading(false);
    }

    // 🎵 Start Background Audio
    if (audioPlayerRef.current) {
      audioPlayerRef.current.loop = true;
      audioPlayerRef.current.volume = 0.5;
      audioPlayerRef.current
        .play()
        .catch((err) => console.error("Error playing background audio: ", err));
    }

    // 🔊 Effect Audio (Initially Muted)
    if (audioEffectPlayerRef.current) {
      audioEffectPlayerRef.current.loop = true;
      audioEffectPlayerRef.current.volume = 0;
      audioEffectPlayerRef.current
        .play()
        .catch((err) => console.error("Error playing effect audio: ", err));
    }
  };

  return (
    <StyledSection onClick={toggleExperience}>
      {!isStarted && (
        <div
          style={{
            position: "absolute",
            color: "white",
            fontSize: "32px",
            zIndex: "9999",
            textTransform: "uppercase",
            fontStyle: "italic",
          }}
        >
          Click to Start
        </div>
      )}
      <Overlay className={active ? "active" : ""} />
      <ActiveImageDouble
        src={twinPeaksRoomActive}
        alt="twin peaks room"
        fill
        className={isStarted && !active && !loading ? "active" : ""}
        style={{ zIndex: 2 }}
      />
      <ActiveImage
        src={twinPeaksRoomActive}
        alt="twin peaks room"
        fill
        className={isStarted && !active && !loading ? "active" : ""}
        style={{ zIndex: 1 }}
      />
      <BackgroundImage
        src={twinPeaksRoom}
        alt="twin peaks room"
        fill
        style={{ zIndex: 0 }}
      />
      <audio ref={audioEffectPlayerRef} src="./audios/powerSurge.mp3"></audio>
      <audio ref={audioPlayerRef} src="./audios/powerlineTension.mp3"></audio>
    </StyledSection>
  );
};

export default GlassBox;
