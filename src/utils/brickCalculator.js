import { canvas } from '../canvas';
import {
  BRICK_OFFSET_LEFT,
  BRICK_COLUMN_COUNT,
  BRICK_PADDING,
  BRICK_ROW_COUNT,
  BRICK_HEIGHT,
  BRICK_OFFSET_TOP,
} from '../config';
import Brick from '../gameObjects/Brick';

/**
 * Calculates the width of one brick using values from the imported
 * configuration file.
 *
 * @returns {number}
 */
export const brickWidth = () =>
  (
    canvas.clientWidth
    - (2 * BRICK_OFFSET_LEFT)
    - ((BRICK_COLUMN_COUNT - 1) * BRICK_PADDING)
  ) / BRICK_COLUMN_COUNT;

/**
 * Generate the bricks at the start of the game. Using values from the imported
 * configuration file.
 *
 * @returns {Brick[]}
 */
export const generateBricks = () => {
  const bw = brickWidth();

  const bricks = [];
  for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    for (let r = 0; r < BRICK_ROW_COUNT; r++) {
      bricks.push(new Brick({
        x: (c * (bw + BRICK_PADDING)) + BRICK_OFFSET_LEFT,
        y: (r * (BRICK_HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP,
        width: bw,
        height: BRICK_HEIGHT,
      }));
    }
  }

  return bricks;
};
