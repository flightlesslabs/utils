/**
 * Creates a promise that resolves after a specified delay.
 *
 * This is useful for pausing execution in asynchronous workflows,
 * throttling operations, or simulating delays in tests.
 *
 * @group Time
 *
 * @param milliseconds - The number of milliseconds to wait before resolving.
 * @returns A promise that resolves after the specified duration.
 *
 * @example
 * Basic usage:
 * ```ts
 * await timeout(2000); // Waits 2 seconds
 * ```
 *
 * @example
 * In an async function:
 * ```ts
 * async function waitForIt() {
 *   console.log("Waiting for 2 seconds...");
 *   await timeout(2000);
 *   console.log("Done waiting!");
 * }
 *
 * waitForIt();
 * ```
 */
export default function timeout(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
