import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function animateLineFilling(
    scope: HTMLDivElement,
    lineReference: string
): gsap.core.Timeline {
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