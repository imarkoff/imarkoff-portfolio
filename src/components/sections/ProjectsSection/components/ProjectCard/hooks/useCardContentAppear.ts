import {ProjectCardProps, ProjectCardReference} from "../types";
import {useGSAP} from "@gsap/react";
import {RefObject} from "react";
import animateCardContentAppear from "../animations/animateCardContentAppear";

export default function useCardContentAppear(
    cardRef: RefObject<HTMLDivElement | null>,
    references: ProjectCardReference['content'] | undefined,
    index: ProjectCardProps['index'],
) {
    useGSAP(() => {
        const scope = cardRef.current;
        if (!scope) return;

        if (!references) return;
        const cardContent = scope.querySelector(`.${references.className}`);
        const techLabels = scope.querySelectorAll(`.${references.techLabelClassName}`);
        if (!cardContent || !techLabels) return;

        animateCardContentAppear(cardContent, techLabels, index);
    }, { scope: cardRef });
}