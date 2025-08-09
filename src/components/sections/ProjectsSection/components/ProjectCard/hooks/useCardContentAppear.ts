import {ProjectCardProps} from "../types";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";
import animateCardContentAppear from "../animations/animateCardContentAppear";

export default function useCardContentAppear(
    references: ProjectCardProps['references'],
    index: ProjectCardProps['index'],
) {
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const scope = cardRef.current;
        if (!scope) return;

        if (!references) return;
        const cardContent = scope.querySelector(`.${references.content.className}`);
        const techLabels = scope.querySelectorAll(`.${references.content.techLabelClassName}`);
        if (!cardContent || !techLabels) return;

        animateCardContentAppear(cardContent, techLabels, index);
    }, { scope: cardRef });

    return cardRef;
}