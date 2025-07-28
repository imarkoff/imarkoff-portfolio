"use client";

import {ReactNode, useMemo, useRef} from "react";
import {TickerDirection} from "@/app/components/ui/VerticalTicker/types";
import useVerticalTickerAnimation from "@/app/components/ui/VerticalTicker/hooks/useVerticalTickerAnimation";
import useDuplicatesCounter from "@/app/components/ui/VerticalTicker/hooks/useDuplicatesCounter";

interface VerticalTickerProps {
    children: ReactNode;
    spacing: number;
    direction: TickerDirection;
    speed: number;
    startDelay?: number;
}

/**
 * Component for creating a vertical ticker with repeating elements.
 * Parent element should have a fixed height and overflow set to hidden.
 * It duplicates the children elements to create a continuous scrolling effect.
 * The ticker can scroll in both up and down directions, with customizable spacing and speed.
 *
 * @param children - The content to be displayed in the ticker, can be any ReactNode.
 * @param spacing - The spacing between the ticker items, in pixels.
 * @param direction - The direction of the ticker scroll.
 * @param speed - The speed of the ticker scroll, in 50 pixels per second.
 * @param startDelay - The delay before the ticker starts scrolling, in seconds. Default is 0.
 *
 * @example
 * ```tsx
 * // An animation from the top to the bottom with a spacing of 20 pixels,
 * // a speed of 0.5 (which means 25 pixels per second), and a start delay of 2 seconds.
 * <VerticalTicker spacing={20} direction="down" speed={0.5} startDelay={2}>
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 *     <div>Item 3</div>
 * </VerticalTicker>
 * ```
 *
 * @example
 * ```tsx
 * // An animation from the bottom to the top with a spacing of 30 pixels,
 * // a speed of 1 (which means 50 pixels per second), and no start delay.
 * <VerticalTicker spacing={30} direction="up" speed={1}>
 *     <div>Item A</div>
 *     <div>Item B</div>
 *     <div>Item C</div>
 * </VerticalTicker>
 * ```
 */
export default function VerticalTicker(
    {children, spacing, direction, speed, startDelay = 0}: VerticalTickerProps)
{
    const tickerStripRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const duplicatesQuantity = useDuplicatesCounter(contentRef, tickerStripRef, spacing);

    useVerticalTickerAnimation(
        { tickerStripRef, contentRef },
        { spacing, direction, speed, startDelay }
    );

    const duplicatedElements = useMemo(() => (
        <>
            {Array.from({length: duplicatesQuantity}, (_, index) => (
                <div key={index} className="flex flex-col" style={{gap: spacing}}>
                    {children}
                </div>
            ))}
        </>
    ), [children, duplicatesQuantity, spacing]);

    return (
        <div
            ref={tickerStripRef}
            className={"flex flex-col"}
            style={{ gap: spacing }}
        >
            <div ref={contentRef} className="flex flex-col" style={{ gap: spacing }}>
                {children}
            </div>
            {duplicatedElements}
        </div>
    );
}