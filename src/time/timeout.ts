/**
 * Creates a promise that resolves after a specified number of milliseconds.
 * This is a convenient way to pause execution in an async function.
 *
 * @param milliseconds The number of milliseconds to wait before resolving.
 * @returns A promise that resolves after the specified duration.
 * @example
 * ```typescript
 * async function waitForIt() {
 * console.log("Waiting for 2 seconds...");
 * await timeout(2000);
 * console.log("Done waiting!");
 * }
 *
 * waitForIt();
 * ```
 */
export default function timeout(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}
