import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function animateTrueFooter(
    footerElement: HTMLDivElement
) {
    const tl = gsap.timeline({});

    ScrollTrigger.create({
        trigger: footerElement,
        start: "top bottom",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        animation: tl
    });

    tl.from(footerElement, {
        duration: 2,
        opacity: 0.25,
        yPercent: 100,
        ease: "elastic.out(0.7, 0)",
    });

    return tl;
}