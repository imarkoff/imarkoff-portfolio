"use client";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useRef, useState} from "react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import getDecimalPlaces from "@/utils/getDecimalPlaces";

gsap.registerPlugin(ScrollTrigger);

interface NumberIncrementProps {
    /** Initial value to start the animation from */
    initialValue: number;

    /** Final value to animate to */
    finalValue: number;

    /** Number of decimal places to display.
     * If 'auto', it will determine the maximum precision based on initial and final values
     * @default 'auto'
     * */
    precision?: number | 'auto';

    /** Duration of the animation in seconds
     * @default 1
     */
    duration?: number;
}

/**
 * Animates a number from an initial value to a final value
 * using GSAP and ScrollTrigger.
 *
 * Automatically determines the precision and adds aria-label for accessibility.
 *
 * @example
 * ```tsx
 * // will animate from 0 to 1000 with 2 decimal places over 1.5 seconds
 * <NumberIncrement
 *   initialValue={0}
 *   finalValue={1000}
 *   precision={2}
 *   duration={1.5}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // will animate from 3.14 to 19.528 with auto precision (3 decimal places) over 1 second
 * <NumberIncrement
 *  initialValue={3.14}
 *  finalValue={19.28}
 *  precision="auto"
 *  duration={1}
 * />
 */
export default function NumberIncrement(
    { initialValue, finalValue, precision = 'auto', duration = 1 }: NumberIncrementProps
) {
    const spanRef = useRef<HTMLSpanElement>(null);
    // Initialize with finalValue instead of initialValue for progressive enhancement -
    // this ensures users with JavaScript disabled see the final value rather than
    // the starting animation value
    const [displayValue, setDisplayValue] = useState(finalValue);

    const getActualPrecision = (): number => {
        if (precision !== 'auto') return precision;

        const initialDecimals = getDecimalPlaces(initialValue);
        const finalDecimals = getDecimalPlaces(finalValue);

        return Math.max(initialDecimals, finalDecimals);
    };

    const actualPrecision = getActualPrecision();

    useGSAP(() => {
        if (!spanRef.current) return;

        const object = { value: initialValue };

        ScrollTrigger.create({
            trigger: spanRef.current,
            id: "number-increment.scroll-trigger",
            start: "top 80%",
            end: "bottom 85%",
            // markers: true,
            scrub: 1.5,
            animation: gsap.to(object, {
                value: finalValue,
                duration: duration,
                ease: "power1.inOut",
                onUpdate: () => { setDisplayValue(object.value); },
            }),
        });
    }, [finalValue, initialValue, actualPrecision, duration]);

    return (
        <span ref={spanRef} aria-label={`Number increment from ${initialValue} to ${finalValue}`}>
            {displayValue.toFixed(actualPrecision)}
        </span>
    );
}