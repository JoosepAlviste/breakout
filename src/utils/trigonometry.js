/**
 * Calculate the opposite side of a triangle given an angle (in radians) and the
 * length of a hypotenuse.
 *
 * @param {number} angle
 * @param {number} hypotenuse
 *
 * @returns {number}
 */
export const calculateOppositeSide = ({ angle, hypotenuse }) =>
  Math.sin(angle) * hypotenuse;

/**
 * Calculate the adjacent side of a triangle given an angle (in radians) and the
 * length of a hypotenuse.
 *
 * @param {number} angle
 * @param {number} hypotenuse
 *
 * @returns {number}
 */
export const calculateAdjacentSide = ({ angle, hypotenuse }) =>
  Math.cos(angle) * hypotenuse;
