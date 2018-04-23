export const calculateOppositeSide = ({ angle, hypotenuse }) =>
  Math.sin(angle) * hypotenuse;

export const calculateAdjacentSide = ({ angle, hypotenuse }) =>
  Math.cos(angle) * hypotenuse;
