"use client";

import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

export default function DownArrow() {
    const arrowRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const arrowElement = arrowRef.current;
        const containerElement = containerRef.current;
        if (!arrowElement || !containerElement) return;

        const tl = gsap.timeline({});

        tl.fromTo(containerElement, {
            opacity: 0,
            y: -10,
        }, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "elastic.out(0.5)",
            delay: 5,
        });

        tl.fromTo(arrowElement, {
            y: 15,
        }, {
            y: 0,
            duration: 2,
            ease: "elastic.out(0.5)",
            repeat: -1,
            yoyo: true,
        }, 0);

        tl.fromTo(containerElement, {
            y: 5
        }, {
            y: 0,
            duration: 2,
            ease: "elastic.out(0.5)",
            repeat: -1,
            yoyo: true,
        }, 0);
    });

    return (
        <div
            className={`px-3 py-5 border-2 rounded-full text-ghost-button-fg/50 bg-tertiary/5`}
            ref={containerRef}
        >
            <svg width="24" height="47" viewBox="0 0 24 47" fill="currentColor" xmlns="http://www.w3.org/2000/svg" ref={arrowRef}>
                <path d="M10.9393 46.5607C11.5251 47.1464 12.4749 47.1464 13.0607 46.5607L22.6066 37.0147C23.1924 36.4289 23.1924 35.4792 22.6066 34.8934C22.0208 34.3076 21.0711 34.3076 20.4853 34.8934L12 43.3787L3.51472 34.8934C2.92893 34.3076 1.97919 34.3076 1.3934 34.8934C0.807611 35.4792 0.807611 36.4289 1.3934 37.0147L10.9393 46.5607ZM12 0.5L10.5 0.5L10.5 45.5H12H13.5L13.5 0.5L12 0.5Z" />
            </svg>
        </div>
    );
}