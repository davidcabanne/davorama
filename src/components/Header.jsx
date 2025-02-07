import React from "react";
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

const Ul = styled.ul`
  display: flex;
  gap: ${_var.spaceS};
`;

const Header = () => {
  return (
    <Container id="#top">
      <Wrapper>
        <Link href="/">
          <Logo />
        </Link>
        <Ul>
          <li>
            <IconPrevious />
          </li>
        </Ul>
      </Wrapper>
    </Container>
  );
};

export default Header;
