"use client";

import React, {ReactNode, useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import clsx from "clsx";

interface VerticalTickerProps {
    children: ReactNode;
    spacing: number;
    direction: "up" | "down";
    duration: number;
}

export default function VerticalTicker(
    {children, spacing, direction, duration}: VerticalTickerProps)
{
    const tickerStripRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const hoverTweenRef = useRef<gsap.core.Tween | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    gsap.registerPlugin(useGSAP);

    const [duplicatesQuantity, setDuplicatesQuantity] = React.useState(1);

    useGSAP(() => {
        if (!tickerStripRef.current || !contentRef.current) {
            return;
        }

        const contentHeight = contentRef.current.offsetHeight;
        const containerHeight = tickerStripRef.current.parentElement?.offsetHeight || 0;
        const requiredDuplicates = Math.ceil(containerHeight / contentHeight);
        setDuplicatesQuantity(requiredDuplicates);

        console.log("Content Height:", contentHeight);

        const yLocation = {
            up: {start: 0, to: -contentHeight - spacing},
            down: {start: -contentHeight - spacing, to: 0}
        }

        gsap.set(tickerStripRef.current, { y: yLocation[direction].start });

        tl.current = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" },
            paused: false,
        });

        tl.current.to(tickerStripRef.current, {
            y: yLocation[direction].to,
            duration: duration,
        });

        // Optional: Pause on hover
        const tickerContainer = tickerStripRef.current;
        if (tickerContainer) {
            tickerContainer.onmouseenter = () => {
                // Clear any pending timeouts
                if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                }

                // Kill any existing animation
                if (hoverTweenRef.current) {
                    hoverTweenRef.current.kill();
                }

                // Create new slow-down animation
                hoverTweenRef.current = gsap.to(tl.current, {
                    timeScale: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            };

            tickerContainer.onmouseleave = () => {
                // Add a small delay to handle quick hover events
                hoverTimeoutRef.current = setTimeout(() => {
                    // Kill any existing animation
                    if (hoverTweenRef.current) {
                        hoverTweenRef.current.kill();
                    }

                    // Create new speed-up animation
                    hoverTweenRef.current = gsap.to(tl.current, {
                        timeScale: 1,
                        duration: 0.4,
                        ease: "power1.in"
                    });
                }, 50); // 50ms delay to handle quick hover events
            };
        }

        return () => {
            tl.current?.kill();
            if (hoverTweenRef.current) {
                hoverTweenRef.current.kill();
            }
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
            if (tickerContainer) {
                tickerContainer.onmouseenter = null;
                tickerContainer.onmouseleave = null;
            }
        };
    });

    return (
        <div
            ref={tickerStripRef}
            className={clsx(
                "flex flex-col",
                {"justify-self-start": direction === "up"},
                {"justify-self-end": direction === "down"},
            )}
            style={{ gap: spacing }}
        >
            <div ref={contentRef} className="flex flex-col" style={{ gap: spacing }}>
                {children}
            </div>

            {Array.from({ length: duplicatesQuantity }, (_, index) => (
                <div key={index} className="flex flex-col" style={{ gap: spacing }}>
                    {children}
                </div>
            ))}
        </div>
    );
}