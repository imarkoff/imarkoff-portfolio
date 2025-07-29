import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin, SplitText);

export default function useShowcaseAppear() {
    const pathRef = useRef<SVGPathElement>(null);
    const arrowRef = useRef<SVGPathElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        if (!pathRef.current || !arrowRef.current || !textRef.current) return;

        const tl = gsap.timeline();

        animateText(tl, textRef.current);
        animateArrow(tl, arrowRef.current, pathRef.current);
    }, []);

    return {
        pathRef,
        arrowRef,
        textRef
    };
}

function animateText(
    tl: gsap.core.Timeline,
    textElement: HTMLParagraphElement,
) {
    const splitText = new SplitText(textElement, { type: "words" });

    tl.from(splitText.words, {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        ease: "power2.out",
        delay: 3
    })
}

function animateArrow(
    tl: gsap.core.Timeline,
    arrowElement: SVGPathElement,
    pathElement: SVGPathElement
) {
    const pathLength = pathElement.getTotalLength();

    tl.fromTo(pathElement, {
        stroke: "currentColor",
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
    }, {
        strokeDasharray: pathLength,
        strokeDashoffset: 0,
        duration: 2,
        ease: "power3.out"
    }, "<");

    tl.set(arrowElement, {
        motionPath: {
            path: pathElement,
            autoRotate: true,
        },
        xPercent: -30,
        yPercent: -55,
        stroke: "currentColor",
        transformOrigin: "center center",
    }, "<");

    tl.fromTo(arrowElement, {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 0.5
    }, "-=1");
}