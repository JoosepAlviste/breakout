import { canvas } from '../canvas';
import { BRICK_OFFSET_LEFT, BRICK_COLUMN_COUNT, BRICK_PADDING } from '../config';

export const brickWidth = () =>
  (
    canvas.clientWidth
    - (2 * BRICK_OFFSET_LEFT)
    - ((BRICK_COLUMN_COUNT - 1) * BRICK_PADDING)
  ) / BRICK_COLUMN_COUNT;
