import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function staggerIntro(
    introElement: HTMLDivElement
) {
    const tl = gsap.timeline({});

    const children = introElement.children;

    ScrollTrigger.create({
        trigger: introElement,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        animation: tl
    });

    tl.from(children, {
        duration: 0.25,
        opacity: 0.25,
        y: 50,
        stagger: 0.1,
    });

    return tl;
}