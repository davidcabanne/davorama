import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import * as _var from "../../styles/variables";

const Placeholder = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
    opacity: 0.25;
  }
`;

const Svg = styled.svg`
  transform: translateX(0px);
  transition: 200ms ${_var.cubicBezier};
  transition-property: transform;
  width: 14px;

  &.light {
    path {
      fill: ${_var.clr_dark};
    }
  }
  &.dark {
    path {
      fill: ${_var.clr_light};
    }
  }

  &:hover {
    transform: translateX(-4px);
  }
`;

const IconPrevious = ({ theme }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [router.pathname]);

  return (
    <Placeholder
      onClick={() => !isDisabled && router.back()}
      disabled={isDisabled}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 15"
        xmlSpace="preserve"
        className={theme === "dark" ? "dark" : "light"}
      >
        <path d="M0 7.40234C0 7.64648 0.107422 7.87109 0.302734 8.05664L6.78711 14.5312C6.98242 14.7168 7.1875 14.8047 7.42188 14.8047C7.90039 14.8047 8.28125 14.4531 8.28125 13.9648C8.28125 13.7305 8.19336 13.4961 8.03711 13.3496L5.84961 11.123L1.98242 7.59766L1.77734 8.07617L4.92188 8.27148L17.2754 8.27148C17.7832 8.27148 18.1348 7.91016 18.1348 7.40234C18.1348 6.89453 17.7832 6.5332 17.2754 6.5332L4.92188 6.5332L1.77734 6.72852L1.98242 7.2168L5.84961 3.68164L8.03711 1.45508C8.19336 1.29883 8.28125 1.07422 8.28125 0.839844C8.28125 0.351562 7.90039 0 7.42188 0C7.1875 0 6.98242 0.078125 6.76758 0.292969L0.302734 6.74805C0.107422 6.93359 0 7.1582 0 7.40234Z" />
      </Svg>
    </Placeholder>
  );
};

export default IconPrevious;
