import {RefObject} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {TickerDirection} from "@/components/ui/VerticalTicker/types";
import TickerStopper from "@/components/ui/VerticalTicker/utils/TickerStopper";
import {calculateTickerAnimation} from "@/components/ui/VerticalTicker/utils/tickerCalculations";

type AnimationRefs = {
    tickerStripRef: RefObject<HTMLDivElement | null>,
    contentRef: RefObject<HTMLDivElement | null>,
};

export type AnimationParams = {
    spacing: number,
    direction: TickerDirection,
    speed: number,
    startDelay: number
};

/**
 * Custom hook to handle vertical ticker animation using GSAP.
 * @param tickerStripRef - Reference to the ticker strip element.
 * @param contentRef - Reference to the content element of the ticker.
 * @param spacing - Spacing between ticker items.
 * @param direction - Direction of the ticker animation (up or down).
 * @param speed - Speed of the ticker animation in 50 pixels per second.
 * @param startDelay - Delay before the ticker animation starts, in seconds.
 */
export default function useVerticalTickerAnimation(
    {tickerStripRef, contentRef}: AnimationRefs,
    {spacing, direction, speed, startDelay}: AnimationParams
) {
    useGSAP(() => {
        if (!tickerStripRef.current || !contentRef.current) return;

        const contentHeight = contentRef.current.offsetHeight;
        const { yPosition, duration } = calculateTickerAnimation(
            contentHeight, spacing, direction, speed
        );

        gsap.set(tickerStripRef.current, { y: yPosition.start });

        const tl = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" },
            delay: startDelay,
            paused: false,
        });

        tl.to(tickerStripRef.current, {
            y: yPosition.end,
            duration: duration,
        });

        const stopper = new TickerStopper(tickerStripRef.current, tl);

        return () => {
            tl.kill();
            stopper.destroy();
        };
    }, [tickerStripRef, contentRef, spacing, direction, speed, startDelay]);
}