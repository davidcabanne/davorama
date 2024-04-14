import styled from 'styled-components';
import * as _var from '../styles/variables';

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
    font-weight: 600;
    padding: ${_var.spaceM};
    cursor: pointer;
  }
`;

const Header = () => {
  return (
    <Container id="#top">
      <a>DAVORAMA(S)</a>
    </Container>
  );
};

export default Header;
