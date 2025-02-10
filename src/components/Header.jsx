import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import * as _var from "../styles/variables";

import Logo from "./Logo";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  & a {
    color: ${_var.primary_010};
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
  padding: ${_var.spaceXS};
`;

const Header = () => {
  const [theme, setTheme] = useState("light");

  const router = useRouter();
  const pathname = router.asPath;

  useEffect(() => {
    pathname === "/moving-through-space-and-time" ||
    pathname === "/glass-box" ||
    pathname === "/the-thin-blue-line"
      ? setTheme("dark")
      : setTheme("light");
  }, [pathname]);

  return (
    <Container id="#top">
      <Wrapper>
        <Logo theme={theme} />
      </Wrapper>
    </Container>
  );
};

export default Header;
