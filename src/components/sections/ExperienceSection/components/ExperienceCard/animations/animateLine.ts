import {LineReferences} from "../types";
import animateLineFilling from "./animateLineFilling";
import animateLinePin from "./animateLinePin";

interface AnimateLineReturn {
    filledLineTl: gsap.core.Timeline;
    pinTl: gsap.core.Timeline;
}

export default function animateLine(
    scope: HTMLDivElement,
    references: LineReferences,
    isPresent: boolean
): AnimateLineReturn {
    const filledLineTl = animateLineFilling(scope, references.filledLineClassName);
    const pinTl = animateLinePin(scope, references, isPresent);

    return {filledLineTl, pinTl};
}