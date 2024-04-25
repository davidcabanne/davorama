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
  height: ${_var.headerHeight};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 100;

  & a {
    color: white;
    cursor: pointer;
  }
`;

const Wrapper = styled.nav`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0px ${_var.spaceS};

  & ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: ${_var.spaceS};
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  gap: ${_var.spaceXS};
  text-transform: uppercase;
  text-decoration: none;
`;

const Header = () => {
  const router = useRouter();
  const pathname = router.asPath;

  return (
    <Container id="#top">
      <Wrapper>
        <ul>
          <li>
            <LogoContainer href="/">
              <Logo width={24} fill="white" />
            </LogoContainer>
          </li>
          {pathname !== "/" && (
            <li>
              <Link href="/">
                <IconPrevious />
              </Link>
            </li>
          )}
        </ul>
      </Wrapper>
    </Container>
  );
};

export default Header;
