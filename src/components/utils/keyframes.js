import { keyframes } from "styled-components";

export const slowMovement = keyframes`
0% {
transform: scale(1);
}
50% {
  transform: scale(1.15);
}
100% {
  transform: scale(1);
} 
`;

export const erraticMovement = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  5% {
    transform: translate(-5px, 5px) scale(1.02);
  }
  10% {
    transform: translate(8px, -3px) scale(1.03);
  }
  15% {
    transform: translate(-10px, 7px) scale(1.01);
  }
  20% {
    transform: translate(6px, -8px) scale(1.04);
  }
  25% {
    transform: translate(-7px, 3px) scale(1.02);
  }
  30% {
    transform: translate(4px, -5px) scale(1.03);
  }
  35% {
    transform: translate(-8px, 9px) scale(1.01);
  }
  40% {
    transform: translate(7px, -4px) scale(1.04);
  }
  45% {
    transform: translate(-6px, 8px) scale(1.02);
  }
  50% {
    transform: translate(10px, -10px) scale(1.05);
  }
  55% {
    transform: translate(-5px, 5px) scale(1.02);
  }
  60% {
    transform: translate(8px, -7px) scale(1.03);
  }
  65% {
    transform: translate(-9px, 4px) scale(1.01);
  }
  70% {
    transform: translate(7px, -6px) scale(1.04);
  }
  75% {
    transform: translate(-8px, 3px) scale(1.02);}
  80% {
    transform: translate(5px, -9px) scale(1.03);
  }
  85% {
    transform: translate(-7px, 6px) scale(1.01);
}
  90% {
    transform: translate(6px, -8px) scale(1.04);
  }
  95% {
    transform: translate(-5px, 9px) scale(1.02);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
`;
