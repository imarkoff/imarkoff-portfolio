import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {LineReferences} from "../types";
import {PRESENT_COLOR} from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function animateLinePin(
    scope: HTMLDivElement,
    references: LineReferences,
    isPresent: boolean
): gsap.core.Timeline {
    const pin = scope.querySelector(`.${references.pinClassName}`);
    const pinChild = pin?.querySelector(`.${references.pinChildClassName}`) ?? null;

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
    }).set(pinChild, {
        backgroundColor: isPresent ? PRESENT_COLOR : undefined,
    }, "<");

    return pinTl;
}