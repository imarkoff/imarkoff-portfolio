"use client";

import React, {ReactNode, useMemo, useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Observer} from "gsap/Observer";

interface VerticalTickerProps {
    children: ReactNode;
    spacing: number;
    direction: "up" | "down";
    speed: number;
    startDelay?: number;
}

export default function VerticalTicker(
    {children, spacing, direction, speed, startDelay = 0}: VerticalTickerProps)
{
    const tickerStripRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(useGSAP, Observer);

    const [duplicatesQuantity, setDuplicatesQuantity] = React.useState(1);

    useGSAP(() => {
        if (!tickerStripRef.current || !contentRef.current) return;

        const contentHeight = contentRef.current.offsetHeight;
        const containerHeight = tickerStripRef.current.parentElement?.offsetHeight || 0;
        const requiredDuplicates = Math.ceil(containerHeight / contentHeight);
        setDuplicatesQuantity(requiredDuplicates);

        const animationDistance = contentHeight + spacing;
        const yLocation = {
            up: {start: 0, to: -animationDistance},
            down: {start: -animationDistance, to: 0}
        }

        gsap.set(tickerStripRef.current, { y: yLocation[direction].start });

        const tl = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" },
            delay: startDelay,
            paused: false,
        });

        tl.to(tickerStripRef.current, {
            y: yLocation[direction].to,
            duration: animationDistance / (speed * 50),
        });

        const stopTl = gsap.timeline({});
        const observerInstance = Observer.create({
            target: tickerStripRef.current,
            type: "pointer",
            onHover: () => {
                stopTl.to(tl, {
                    timeScale: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            },
            onHoverEnd: () => {
                stopTl.to(tl, {
                    timeScale: 1,
                    duration: 0.5,
                    ease: "power2.in"
                }, "-=0.2");
            }
        });

        return () => {
            tl.kill();
            observerInstance.kill();
        };
    });

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
            className={"flex flex-col gap-1"}
            style={{ gap: spacing }}
        >
            <div ref={contentRef} className="flex flex-col" style={{ gap: spacing }}>
                {children}
            </div>

            {duplicatedElements}
        </div>
    );
}