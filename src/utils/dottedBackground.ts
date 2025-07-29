import {CSSProperties} from "react";

/**
 * Generates a CSS style object for a dotted background.
 * @param dotColor - The color of the dots.
 * @param dotSize - The size of the dots (can be a number or a string with CSS units).
 * @param spacing - The spacing between the dots (can be a number or a string with CSS units).
 * @return A CSSProperties object that can be applied to a React component's style.
 *
 * @example
 * ```tsx
 * import dottedBackground from "@/app/utils/dottedBackground";
 *
 * const style = dottedBackground("rgba(0, 0, 0, 0.1)", 5, 20);
 * <div style={style}>
 *   Your content here
 * </div>
 * ```
 */
export default function dottedBackground(
    dotColor: string,
    dotSize: number | string,
    spacing: number | string,
): CSSProperties {
    return {
        backgroundImage: `radial-gradient(${dotColor} ${dotSize}, transparent 0)`,
        backgroundSize: `${spacing} ${spacing}`,
        backgroundPosition: "0 0, 50% 50%",
        backgroundRepeat: "repeat",
    };
}