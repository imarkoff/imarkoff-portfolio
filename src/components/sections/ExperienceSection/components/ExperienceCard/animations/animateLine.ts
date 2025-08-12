import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {LineReferences} from "../types";

interface AnimateLineReturn {
    filledLineTl: gsap.core.Timeline;
    pinTl: gsap.core.Timeline;
}

export default function animateLine(
    scope: HTMLDivElement,
    references: LineReferences,
    isPresent: boolean
): AnimateLineReturn {
    const filledLineTl = animateFilledLine(scope, references.filledLineClassName);
    const pinTl = animatePin(scope, references, isPresent);

    return {filledLineTl, pinTl};
}

export function animateFilledLine(
    scope: HTMLDivElement,
    lineReference: string
) {
    const filledLine = scope.querySelector(`.${lineReference}`);

    const filledLineTl = gsap.timeline({});

    gsap.set(filledLine, {
        scaleY: 0,
    });

    ScrollTrigger.create({
        trigger: scope,
        start: "top 65%",
        end: "bottom 65%",
        id: "filled-line",
        // markers: true,
        scrub: true,
        animation: filledLineTl
    });

    filledLineTl.to(filledLine, {
        scaleY: 1,
    });

    return filledLineTl;
}

export function animatePin(
    scope: HTMLDivElement,
    references: LineReferences,
    isPresent: boolean
) {
    const pin = scope.querySelector(`.${references.pinClassName}`);

    const pinTl = gsap.timeline({});

    gsap.set(pin, {
        scale: 0.5,
    });

    ScrollTrigger.create({
        trigger: pin,
        start: "top 70%",
        end: "bottom 70%",
        id: "pin",
        toggleActions: "play none none reverse",
        // markers: true,
        animation: pinTl
    });

    pinTl.to(pin, {
        scale: 1,
        ease: "back.out(3.5)",
    }).set(pin?.childNodes[0] || null, {
        backgroundColor: isPresent ? "var(--color-active-filled-hover)" : undefined,
    }, "<");

    return pinTl;
}