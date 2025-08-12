import {RefObject} from "react";
import {useGSAP} from "@gsap/react";
import {ExperienceCardReferences} from "../types";
import animateSidesAppear from "../animations/animateSidesAppear";
import animateLine from "../animations/animateLine";

export default function useAnimateExperienceCard(
    rootRef: RefObject<HTMLDivElement | null>,
    isPresent: boolean,
    references: ExperienceCardReferences
) {
    useGSAP(() => {
        const scope = rootRef.current;
        if (!scope) return;

        animateSidesAppear(scope, references);
        animateLine(scope, references.line, isPresent);
    }, {scope: rootRef});
}