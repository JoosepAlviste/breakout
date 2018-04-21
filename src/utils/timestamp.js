/**
 * Get the current timestamp.
 *
 * @returns {number}
 */
export const timestamp = () =>
  window.performance && window.performance.now
    ? window.performance.now()
    : new Date().getTime();

/**
 * Calculate the delta time in seconds. Minimum of 1 second since the browser
 * tab may lose focus resulting in a very large delta time.
 *
 * @param {number} now
 * @param {number} last
 * @returns {number}
 */
export const calculateDeltaTime = (now, last) =>
  Math.min(1, (now - last) / 1000);

/**
 * Calculate the delta time for each frame.
 *
 * @returns {function(): number}
 */
export const dt = () => {
  let now = timestamp();
  let last = now;

  return () => {
    now = timestamp();
    const dt = calculateDeltaTime(now, last);

    last = now;

    return dt;
  };
};
