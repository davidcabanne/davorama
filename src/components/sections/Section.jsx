import styled, { css } from "styled-components";
import * as _var from "../../styles/variables";

export const Section = styled.section`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${_var.spaceXL} ${_var.spaceS};
    overflow-x: hidden;

  @media ${_var.device.tablet_max} {
    padding: ${_var.spaceL} ${_var.spaceS};
  }

  ${(props) =>
    props.$capitalism &&
    css`
      padding: ${_var.spaceXL} ${_var.spaceS} 10% ${_var.spaceS};
      margin-bottom: ${_var.spaceXL};

      @media ${_var.device.tablet_max} {
        padding: ${_var.spaceXL} ${_var.spaceS};
        margin-bottom: ${_var.spaceL};
      }
    `}
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${_var.spaceS};
`;
