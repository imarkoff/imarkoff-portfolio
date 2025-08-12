import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {ExperienceCardReferences} from "@/components/sections/ExperienceSection/components/ExperienceCard/types";

gsap.registerPlugin(ScrollTrigger);

export default function animateSidesAppear(
    scope: HTMLDivElement,
    references: ExperienceCardReferences
) {
    const tl = gsap.timeline({});

    ScrollTrigger.create({
        trigger: scope,
        start: "top 75%",
        end: "bottom 75%",
        id: "experience-card-sides-appear",
        toggleActions: "play none none reverse",
        // markers: true,
        animation: tl
    });

    tl.fromTo(`.${references.leftSideClassName}`, {
        x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        ease: "back.out(1.7)",
    });

    tl.fromTo(`.${references.rightSideClassName}`, {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        ease: "back.out(1.7)",
    }, "<");

    return tl;
}