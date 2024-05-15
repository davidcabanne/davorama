import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import * as _var from "../styles/variables";

import IconPrevious from "./icons/IconPrevious";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 100;

  & a {
    color: ${_var.clr_dark};
    text-decoration: none;
    cursor: pointer;
  }
`;

const Wrapper = styled.nav`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${_var.spaceS};
`;

const Ul = styled.ul`
  display: flex;
  gap: ${_var.spaceS};
  transform: translateX(16px);
  transition: 200ms ${_var.cubicBezier};
  transition-property: transform;
  will-change: transform;

  & li {
    & :last-child {
      width: 0px;
      margin-left: 0px;
      overflow: hidden;
      transition: 200ms ${_var.cubicBezier};
      transition-property: width;
      will-change: width;
    }
  }

  &.active {
    transform: translateX(-16px);

    & li {
      & :last-child {
        width: 14px;
        overflow: visible;
      }
    }
  }
`;

const Header = () => {
  const [currentPathname, setCurrentPathname] = useState("/");

  const router = useRouter();
  const pathname = router.asPath;

  useEffect(() => {
    setCurrentPathname(pathname);
  }, [pathname]);

  return (
    <Container id="#top">
      <Wrapper>
        <Link href="/">Davorama</Link>
        <Ul className={currentPathname !== "/" ? "active" : ""}>
          <li>
            <Link href="/">music</Link>
          </li>
          <li>
            <Link
              href="/#grid"
              style={{
                textDecoration:
                  currentPathname === "/#grid" ? "underline" : "none",
              }}
            >
              visuals
            </Link>
          </li>
          <li>
            <Link href="/">
              <IconPrevious />
            </Link>
          </li>
        </Ul>
      </Wrapper>
    </Container>
  );
};

export default Header;
