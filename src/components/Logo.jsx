import * as _var from "../styles/variables";
import styled from "styled-components";

const FONT_SIZE = 6;

const Container = styled.div`
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
    color: ${_var.clr_dark};
  }
  &.dark {
    color: ${_var.clr_light};
  }
`;

const Logo = ({ theme }) => {
  return (
    <Container className={theme === "dark" ? "dark" : "light"}>
      <p>___</p>
      <p>&#47;&#47;&#47;&#92;&#92;</p>
      <p>
        d<span>_</span>e\e
      </p>
      <p>
        <span>_</span>\<span style={{ fontSize: `${FONT_SIZE}px` }}>__</span>-,
      </p>
    </Container>
  );
};

export default Logo;
