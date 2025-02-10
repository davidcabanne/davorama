import Link from "next/link";
import * as _var from "../styles/variables";
import styled from "styled-components";

const FONT_SIZE = 6;

const StyledDiv = styled.div`
  position: absolute;
  top: 20%;
  right: -140%;
  font-size: 8px;
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0;
`;

const Container = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p,
  span {
    font-family: "Courier New";
    font-size: ${FONT_SIZE}px;
    font-weight: 800;
    user-select: none;
  }

  span {
    opacity: 0;
  }

  &.light {
    color: ${_var.primary_010};
  }
  &.dark {
    color: ${_var.primary_100};
  }

  @media ${_var.device.tablet_min} {
    &:hover {
      & ${StyledDiv} {
        opacity: 1;
      }
    }
  }
`;

const Logo = ({ theme }) => {
  return (
    <Container href="/" className={theme === "dark" ? "dark" : "light"}>
      <p>___</p>
      <p>&#47;&#47;&#47;&#92;&#92;</p>
      <p>
        d<span>_</span>e\e
      </p>
      <p>
        <span>_</span>\<span style={{ fontSize: `${FONT_SIZE}px` }}>__</span>-,
      </p>
      <StyledDiv href="/">home?</StyledDiv>
    </Container>
  );
};

export default Logo;
