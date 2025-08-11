import {useGSAP} from "@gsap/react";
import {ProjectsSectionReferences} from "@/components/sections/ProjectsSection/types";
import Project from "@/lib/models/Project";
import {RefObject, useRef} from "react";
import animatePinHeader from "@/components/sections/ProjectsSection/animations/animatePinHeader";
import animateCardsList from "@/components/sections/ProjectsSection/animations/animateCardsList";

export default function useAnimateProjectCards(
    references: ProjectsSectionReferences,
    projects: Project[],
): RefObject<HTMLDivElement | null> {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const scope = rootRef.current;
        if (!scope) return;

        const cardsList = scope.querySelector<HTMLDivElement>(`#${references.projectsListId}`);
        const header = scope.querySelector<HTMLDivElement>(`#${references.projectsHeaderId}`);
        const cards = cardsList?.querySelectorAll(`.${references.projectCard.className}`);

        if (!cardsList || !header || !cards || cards.length === 0) return;

        animatePinHeader(header, cardsList, cards[cards.length - 1]);
        animateCardsList(cards, projects, scope);
    }, { scope: rootRef, dependencies: [projects] });

    return rootRef;
}