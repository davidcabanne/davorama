import styled, { css } from "styled-components";
import * as _var from "../../styles/variables";

export const Section = styled.section`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${_var.spaceXL} ${_var.spaceS};
  overflow: hidden;

  @media ${_var.device.tablet_max} {
    padding: ${_var.spaceL} ${_var.spaceS};
  }
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
