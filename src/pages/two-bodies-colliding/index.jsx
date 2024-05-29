import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as _var from "../../styles/variables";

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Svg = styled.svg`
  position: absolute;
  stroke: black;
  min-width: 200vw;
  transition: transform
    ${(props) => (props.transition ? `500ms ${_var.cubicBezier} ` : "50ms")};

  @media ${_var.device.tablet_max} {
    min-width: 400vw;
  }
`;

const TwoBodiesColliding = () => {
  const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const handleMouseMove = (event) => {
      handleMove(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleMove = (clientX, clientY) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // const maxDistance = 400;
      // const resetDistance = 500;
      const maxDistance = Math.min(window.innerWidth, window.innerHeight) * 0.38;
      const resetDistance =
        Math.min(window.innerWidth, window.innerHeight) * 0.45;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance > resetDistance) {
        setTransition(true);
        setSvgPosition({ x: 0, y: 0 });
        setIsEntering(true);
      } else {
        if (isEntering) {
          setTransition(true);
          setIsEntering(false);
        } else {
          setTransition(false);
        }
        if (distance < maxDistance) {
          setSvgPosition({ x: deltaX, y: deltaY });
        } else {
          const angle = Math.atan2(deltaY, deltaX);
          setSvgPosition({
            x: Math.cos(angle) * maxDistance,
            y: Math.sin(angle) * maxDistance,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isEntering]);

  return (
    <Container>
      <Wrapper>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          xmlSpace="preserve"
          style={{
            transform: `translate(${svgPosition.x}px, ${svgPosition.y}px)`,
          }}
          transition={transition ? 1 : 0}
        >
          <line x1="500" y1="1000" x2="500" y2="0" />
          <line x1="482.6" y1="999.7" x2="517.4" y2=".3" />
          <line x1="465.1" y1="998.8" x2="534.9" y2="1.2" />
          <line x1="447.7" y1="997.3" x2="552.3" y2="2.7" />
          <line x1="430.4" y1="995.1" x2="569.6" y2="4.9" />
          <line x1="413.2" y1="992.4" x2="586.8" y2="7.6" />
          <line x1="396" y1="989.1" x2="604" y2="10.9" />
          <line x1="379" y1="985.1" x2="621" y2="14.9" />
          <line x1="362.2" y1="980.6" x2="637.8" y2="19.4" />
          <line x1="345.5" y1="975.5" x2="654.5" y2="24.5" />
          <line x1="329" y1="969.8" x2="671" y2="30.2" />
          <line x1="312.7" y1="963.6" x2="687.3" y2="36.4" />
          <line x1="296.6" y1="956.8" x2="703.4" y2="43.2" />
          <line x1="280.8" y1="949.4" x2="719.2" y2="50.6" />
          <line x1="265.3" y1="941.5" x2="734.7" y2="58.5" />
          <line x1="250" y1="933" x2="750" y2="67" />
          <line x1="235" y1="924" x2="765" y2="76" />
          <line x1="220.4" y1="914.5" x2="779.6" y2="85.5" />
          <line x1="206.1" y1="904.5" x2="793.9" y2="95.5" />
          <line x1="192.2" y1="894" x2="807.8" y2="106" />
          <line x1="178.6" y1="883" x2="821.4" y2="117" />
          <line x1="165.4" y1="871.6" x2="834.6" y2="128.4" />
          <line x1="152.7" y1="859.7" x2="847.3" y2="140.3" />
          <line x1="140.3" y1="847.3" x2="859.7" y2="152.7" />
          <line x1="128.4" y1="834.6" x2="871.6" y2="165.4" />
          <line x1="117" y1="821.4" x2="883" y2="178.6" />
          <line x1="106" y1="807.8" x2="894" y2="192.2" />
          <line x1="95.5" y1="793.9" x2="904.5" y2="206.1" />
          <line x1="85.5" y1="779.6" x2="914.5" y2="220.4" />
          <line x1="76" y1="765" x2="924" y2="235" />
          <line x1="67" y1="750" x2="933" y2="250" />
          <line x1="58.5" y1="734.7" x2="941.5" y2="265.3" />
          <line x1="50.6" y1="719.2" x2="949.4" y2="280.8" />
          <line x1="43.2" y1="703.4" x2="956.8" y2="296.6" />
          <line x1="36.4" y1="687.3" x2="963.6" y2="312.7" />
          <line x1="30.2" y1="671" x2="969.8" y2="329" />
          <line x1="24.5" y1="654.5" x2="975.5" y2="345.5" />
          <line x1="19.4" y1="637.8" x2="980.6" y2="362.2" />
          <line x1="14.9" y1="621" x2="985.1" y2="379" />
          <line x1="10.9" y1="604" x2="989.1" y2="396" />
          <line x1="7.6" y1="586.8" x2="992.4" y2="413.2" />
          <line x1="4.9" y1="569.6" x2="995.1" y2="430.4" />
          <line x1="2.7" y1="552.3" x2="997.3" y2="447.7" />
          <line x1="1.2" y1="534.9" x2="998.8" y2="465.1" />
          <line x1=".3" y1="517.4" x2="999.7" y2="482.6" />
          <line y1="500" x2="1000" y2="500" />
          <line x1=".3" y1="482.6" x2="999.7" y2="517.4" />
          <line x1="1.2" y1="465.1" x2="998.8" y2="534.9" />
          <line x1="2.7" y1="447.7" x2="997.3" y2="552.3" />
          <line x1="4.9" y1="430.4" x2="995.1" y2="569.6" />
          <line x1="7.6" y1="413.2" x2="992.4" y2="586.8" />
          <line x1="10.9" y1="396" x2="989.1" y2="604" />
          <line x1="14.9" y1="379" x2="985.1" y2="621" />
          <line x1="19.4" y1="362.2" x2="980.6" y2="637.8" />
          <line x1="24.5" y1="345.5" x2="975.5" y2="654.5" />
          <line x1="30.2" y1="329" x2="969.8" y2="671" />
          <line x1="36.4" y1="312.7" x2="963.6" y2="687.3" />
          <line x1="43.2" y1="296.6" x2="956.8" y2="703.4" />
          <line x1="50.6" y1="280.8" x2="949.4" y2="719.2" />
          <line x1="58.5" y1="265.3" x2="941.5" y2="734.7" />
          <line x1="67" y1="250" x2="933" y2="750" />
          <line x1="76" y1="235" x2="924" y2="765" />
          <line x1="85.5" y1="220.4" x2="914.5" y2="779.6" />
          <line x1="95.5" y1="206.1" x2="904.5" y2="793.9" />
          <line x1="106" y1="192.2" x2="894" y2="807.8" />
          <line x1="117" y1="178.6" x2="883" y2="821.4" />
          <line x1="128.4" y1="165.4" x2="871.6" y2="834.6" />
          <line x1="140.3" y1="152.7" x2="859.7" y2="847.3" />
          <line x1="152.7" y1="140.3" x2="847.3" y2="859.7" />
          <line x1="165.4" y1="128.4" x2="834.6" y2="871.6" />
          <line x1="178.6" y1="117" x2="821.4" y2="883" />
          <line x1="192.2" y1="106" x2="807.8" y2="894" />
          <line x1="206.1" y1="95.5" x2="793.9" y2="904.5" />
          <line x1="220.4" y1="85.5" x2="779.6" y2="914.5" />
          <line x1="235" y1="76" x2="765" y2="924" />
          <line x1="250" y1="67" x2="750" y2="933" />
          <line x1="265.3" y1="58.5" x2="734.7" y2="941.5" />
          <line x1="280.8" y1="50.6" x2="719.2" y2="949.4" />
          <line x1="296.6" y1="43.2" x2="703.4" y2="956.8" />
          <line x1="312.7" y1="36.4" x2="687.3" y2="963.6" />
          <line x1="329" y1="30.2" x2="671" y2="969.8" />
          <line x1="345.5" y1="24.5" x2="654.5" y2="975.5" />
          <line x1="362.2" y1="19.4" x2="637.8" y2="980.6" />
          <line x1="379" y1="14.9" x2="621" y2="985.1" />
          <line x1="396" y1="10.9" x2="604" y2="989.1" />
          <line x1="413.2" y1="7.6" x2="586.8" y2="992.4" />
          <line x1="430.4" y1="4.9" x2="569.6" y2="995.1" />
          <line x1="447.7" y1="2.7" x2="552.3" y2="997.3" />
          <line x1="465.1" y1="1.2" x2="534.9" y2="998.8" />
          <line x1="482.6" y1=".3" x2="517.4" y2="999.7" />
          <line x1="500" x2="500" y2="1000" />
        </Svg>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          xmlSpace="preserve"
        >
          <line x1="500" y1="1000" x2="500" y2="0" />
          <line x1="482.6" y1="999.7" x2="517.4" y2=".3" />
          <line x1="465.1" y1="998.8" x2="534.9" y2="1.2" />
          <line x1="447.7" y1="997.3" x2="552.3" y2="2.7" />
          <line x1="430.4" y1="995.1" x2="569.6" y2="4.9" />
          <line x1="413.2" y1="992.4" x2="586.8" y2="7.6" />
          <line x1="396" y1="989.1" x2="604" y2="10.9" />
          <line x1="379" y1="985.1" x2="621" y2="14.9" />
          <line x1="362.2" y1="980.6" x2="637.8" y2="19.4" />
          <line x1="345.5" y1="975.5" x2="654.5" y2="24.5" />
          <line x1="329" y1="969.8" x2="671" y2="30.2" />
          <line x1="312.7" y1="963.6" x2="687.3" y2="36.4" />
          <line x1="296.6" y1="956.8" x2="703.4" y2="43.2" />
          <line x1="280.8" y1="949.4" x2="719.2" y2="50.6" />
          <line x1="265.3" y1="941.5" x2="734.7" y2="58.5" />
          <line x1="250" y1="933" x2="750" y2="67" />
          <line x1="235" y1="924" x2="765" y2="76" />
          <line x1="220.4" y1="914.5" x2="779.6" y2="85.5" />
          <line x1="206.1" y1="904.5" x2="793.9" y2="95.5" />
          <line x1="192.2" y1="894" x2="807.8" y2="106" />
          <line x1="178.6" y1="883" x2="821.4" y2="117" />
          <line x1="165.4" y1="871.6" x2="834.6" y2="128.4" />
          <line x1="152.7" y1="859.7" x2="847.3" y2="140.3" />
          <line x1="140.3" y1="847.3" x2="859.7" y2="152.7" />
          <line x1="128.4" y1="834.6" x2="871.6" y2="165.4" />
          <line x1="117" y1="821.4" x2="883" y2="178.6" />
          <line x1="106" y1="807.8" x2="894" y2="192.2" />
          <line x1="95.5" y1="793.9" x2="904.5" y2="206.1" />
          <line x1="85.5" y1="779.6" x2="914.5" y2="220.4" />
          <line x1="76" y1="765" x2="924" y2="235" />
          <line x1="67" y1="750" x2="933" y2="250" />
          <line x1="58.5" y1="734.7" x2="941.5" y2="265.3" />
          <line x1="50.6" y1="719.2" x2="949.4" y2="280.8" />
          <line x1="43.2" y1="703.4" x2="956.8" y2="296.6" />
          <line x1="36.4" y1="687.3" x2="963.6" y2="312.7" />
          <line x1="30.2" y1="671" x2="969.8" y2="329" />
          <line x1="24.5" y1="654.5" x2="975.5" y2="345.5" />
          <line x1="19.4" y1="637.8" x2="980.6" y2="362.2" />
          <line x1="14.9" y1="621" x2="985.1" y2="379" />
          <line x1="10.9" y1="604" x2="989.1" y2="396" />
          <line x1="7.6" y1="586.8" x2="992.4" y2="413.2" />
          <line x1="4.9" y1="569.6" x2="995.1" y2="430.4" />
          <line x1="2.7" y1="552.3" x2="997.3" y2="447.7" />
          <line x1="1.2" y1="534.9" x2="998.8" y2="465.1" />
          <line x1=".3" y1="517.4" x2="999.7" y2="482.6" />
          <line y1="500" x2="1000" y2="500" />
          <line x1=".3" y1="482.6" x2="999.7" y2="517.4" />
          <line x1="1.2" y1="465.1" x2="998.8" y2="534.9" />
          <line x1="2.7" y1="447.7" x2="997.3" y2="552.3" />
          <line x1="4.9" y1="430.4" x2="995.1" y2="569.6" />
          <line x1="7.6" y1="413.2" x2="992.4" y2="586.8" />
          <line x1="10.9" y1="396" x2="989.1" y2="604" />
          <line x1="14.9" y1="379" x2="985.1" y2="621" />
          <line x1="19.4" y1="362.2" x2="980.6" y2="637.8" />
          <line x1="24.5" y1="345.5" x2="975.5" y2="654.5" />
          <line x1="30.2" y1="329" x2="969.8" y2="671" />
          <line x1="36.4" y1="312.7" x2="963.6" y2="687.3" />
          <line x1="43.2" y1="296.6" x2="956.8" y2="703.4" />
          <line x1="50.6" y1="280.8" x2="949.4" y2="719.2" />
          <line x1="58.5" y1="265.3" x2="941.5" y2="734.7" />
          <line x1="67" y1="250" x2="933" y2="750" />
          <line x1="76" y1="235" x2="924" y2="765" />
          <line x1="85.5" y1="220.4" x2="914.5" y2="779.6" />
          <line x1="95.5" y1="206.1" x2="904.5" y2="793.9" />
          <line x1="106" y1="192.2" x2="894" y2="807.8" />
          <line x1="117" y1="178.6" x2="883" y2="821.4" />
          <line x1="128.4" y1="165.4" x2="871.6" y2="834.6" />
          <line x1="140.3" y1="152.7" x2="859.7" y2="847.3" />
          <line x1="152.7" y1="140.3" x2="847.3" y2="859.7" />
          <line x1="165.4" y1="128.4" x2="834.6" y2="871.6" />
          <line x1="178.6" y1="117" x2="821.4" y2="883" />
          <line x1="192.2" y1="106" x2="807.8" y2="894" />
          <line x1="206.1" y1="95.5" x2="793.9" y2="904.5" />
          <line x1="220.4" y1="85.5" x2="779.6" y2="914.5" />
          <line x1="235" y1="76" x2="765" y2="924" />
          <line x1="250" y1="67" x2="750" y2="933" />
          <line x1="265.3" y1="58.5" x2="734.7" y2="941.5" />
          <line x1="280.8" y1="50.6" x2="719.2" y2="949.4" />
          <line x1="296.6" y1="43.2" x2="703.4" y2="956.8" />
          <line x1="312.7" y1="36.4" x2="687.3" y2="963.6" />
          <line x1="329" y1="30.2" x2="671" y2="969.8" />
          <line x1="345.5" y1="24.5" x2="654.5" y2="975.5" />
          <line x1="362.2" y1="19.4" x2="637.8" y2="980.6" />
          <line x1="379" y1="14.9" x2="621" y2="985.1" />
          <line x1="396" y1="10.9" x2="604" y2="989.1" />
          <line x1="413.2" y1="7.6" x2="586.8" y2="992.4" />
          <line x1="430.4" y1="4.9" x2="569.6" y2="995.1" />
          <line x1="447.7" y1="2.7" x2="552.3" y2="997.3" />
          <line x1="465.1" y1="1.2" x2="534.9" y2="998.8" />
          <line x1="482.6" y1=".3" x2="517.4" y2="999.7" />
          <line x1="500" x2="500" y2="1000" />
        </Svg>
      </Wrapper>
    </Container>
  );
};

export default TwoBodiesColliding;
