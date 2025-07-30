/**
 * Returns the number of decimal places in a given number.
 * @param num - The number to check.
 * @return The number of decimal places in the number.
 *
 * @example
 * ```js
 * getDecimalPlaces(123.456); // returns 3
 * ```
 *
 * @example
 * ```js
 * getDecimalPlaces(100); // returns 0
 * ```
 *
 * @example
 * ```js
 * getDecimalPlaces(0.001); // returns 3
 * ```
 *
 */
export default function getDecimalPlaces(num: number): number {
    const strNum = num.toString();
    const decimalIndex = strNum.indexOf('.');
    return decimalIndex === -1 ? 0 : strNum.length - decimalIndex - 1;
}