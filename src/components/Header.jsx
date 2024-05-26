import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import * as _var from "../styles/variables";

import Logo from "./Logo";
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
  align-items: flex-start;
  padding: ${_var.spaceS};
`;

const Ul = styled.ul`
  display: flex;
  gap: ${_var.spaceS};
`;

const Header = () => {
  const [theme, setTheme] = useState("light");

  const router = useRouter();
  const pathname = router.asPath;

  useEffect(() => {
    pathname === "/moving-through-space-and-time"
      ? setTheme("dark")
      : setTheme("light");
  }, [pathname]);

  return (
    <Container id="#top">
      <Wrapper>
        <Link href="/">
          <Logo theme={theme} />
        </Link>
        <Ul>
          <li>
            <IconPrevious theme={theme} />
          </li>
        </Ul>
      </Wrapper>
    </Container>
  );
};

export default Header;
