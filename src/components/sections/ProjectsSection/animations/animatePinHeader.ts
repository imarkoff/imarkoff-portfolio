import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {SPACE_BETWEEN_HEADER_AND_PROJECTS} from "@/components/sections/ProjectsSection/constants";

gsap.registerPlugin(ScrollTrigger);

export default function animatePinHeader(
    header: HTMLElement,
    cardsList: HTMLElement,
    lastCard: Element
) {
    const pinEndOffset = cardsList.offsetHeight + SPACE_BETWEEN_HEADER_AND_PROJECTS - lastCard.clientHeight;

    ScrollTrigger.create({
        trigger: header,
        start: `bottom 25%-=${SPACE_BETWEEN_HEADER_AND_PROJECTS}px`,
        end: `bottom+=${pinEndOffset} 25%`,
        scrub: true,
        pin: true,
        id: "projects-header-pin",
        pinSpacing: false,
        // markers: true
    });
}