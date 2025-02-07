import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import * as _var from "../../styles/variables";

const Placeholder = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
    opacity: 0.25;
  }

  & div {
    font-size: 14px;
  }
`;

const IconPrevious = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [router.pathname]);

  return (
    <Placeholder
      onClick={() => !isDisabled && router.back()}
      // disabled={isDisabled}
    >
      <div>X</div>
    </Placeholder>
  );
};

export default IconPrevious;
