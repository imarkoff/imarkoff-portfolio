import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function staggerForm(
    cardElement: HTMLDivElement
) {
    const children = cardElement.children;

    const tl = gsap.timeline({});

    ScrollTrigger.create({
        trigger: cardElement,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        animation: tl
    });

    tl.from(cardElement, {
        duration: 0.25,
        opacity: 0,
        x: 100
    });

    tl.from(children, {
        duration: 0.25,
        opacity: 0,
        y: 20,
        stagger: 0.1,
    }, "<");

    return tl;
}