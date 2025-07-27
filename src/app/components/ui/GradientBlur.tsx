import clsx from "clsx";

/**
 * Represents a single blur layer with configurable blur amount and mask boundaries.
 * @property blurAmount - The intensity of the blur effect in pixels
 * @property maskStart - The starting position of the mask gradient in percentage (0-100)
 * @property maskEnd - The ending position of the mask gradient in percentage (0-100)
 */
type BlurLayer = {
    blurAmount: number;
    maskStart: number;
    maskEnd: number;
};

/**
 * @property [direction] - The direction of the gradient blur effect
 * @property [layers] - Array of blur layers with different intensities and masks
 * @property [className] - Additional CSS classes to apply to the container
 * @property [background] - CSS background value for the container
 */
interface GradientBlurProps {
    direction?: "top-to-bottom" | "bottom-to-top";
    layers?: BlurLayer[];
    className?: string;
    background?: string;
}

/**
 * Creates a layered gradient blur effect using backdrop-filter and CSS masks.
 * Each layer can have custom blur intensity and mask positions, creating
 * a progressive blur effect that transitions smoothly.
 *
 * @example
 * // Basic usage with default parameters
 * <GradientBlur />
 *
 * @example
 * // Custom direction and background
 * <GradientBlur
 *   direction="bottom-to-top"
 *   background="rgba(0,0,0,0.2)"
 *   className="my-custom-class"
 * />
 *
 * @example
 * // Custom blur layers
 * <GradientBlur
 *   layers={[
 *     {blurAmount: 20, maskStart: 0, maskEnd: 40},
 *     {blurAmount: 10, maskStart: 30, maskEnd: 70},
 *     {blurAmount: 5, maskStart: 60, maskEnd: 100}
 *   ]}
 * />
 */
export default function GradientBlur(
    {
        direction = "top-to-bottom",
        layers = [
            {blurAmount: 64, maskStart: 0, maskEnd: 30},
            {blurAmount: 32, maskStart: 0, maskEnd: 40},
            {blurAmount: 16, maskStart: 10, maskEnd: 50},
            {blurAmount: 8, maskStart: 30, maskEnd: 60},
            {blurAmount: 4, maskStart: 40, maskEnd: 70},
            {blurAmount: 2, maskStart: 60, maskEnd: 80},
            {blurAmount: 1, maskStart: 70, maskEnd: 100},
        ],
        className,
        background,
    }: GradientBlurProps
) {
    const isTopToBottom = direction === "top-to-bottom";

    return (
        <div className={clsx("absolute inset-0 pointer-events-none", className)} style={{ background }}>
            {layers.map(({blurAmount, maskStart, maskEnd}, index) => {
                const maskGradient = isTopToBottom
                    ? `linear-gradient(rgba(0, 0, 0, 1) ${maskStart}%, rgba(0, 0, 0, 0) ${maskEnd}%)`
                    : `linear-gradient(to top, rgba(0, 0, 0, 1) ${maskStart}%, rgba(0, 0, 0, 0) ${maskEnd}%)`;

                return (
                    <div
                        key={index}
                        data-testid={`gradient-blur-layer-${index}`}
                        className="absolute inset-0 bg-transparent"
                        style={{
                            backdropFilter: `blur(${blurAmount}px)`,
                            mask: maskGradient,
                        }}
                    />
                );
            })}
        </div>
    );
}