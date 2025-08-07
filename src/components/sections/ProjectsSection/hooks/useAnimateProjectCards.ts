import {useGSAP} from "@gsap/react";
import {ProjectsSectionReferences} from "@/components/sections/ProjectsSection/types";
import Project from "@/lib/models/Project";
import {useRef} from "react";
import animatePinHeader from "@/components/sections/ProjectsSection/animations/animatePinHeader";
import animateProjectCards from "@/components/sections/ProjectsSection/animations/animateProjectCards";

export default function useAnimateProjectCards(
    references: ProjectsSectionReferences,
    projects: Project[],
) {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const scope = rootRef.current;
        if (!scope) return;

        const section = scope.querySelector<HTMLDivElement>(`#${references.projectsSectionId}`);
        const header = scope.querySelector<HTMLDivElement>(`#${references.projectsHeaderId}`);
        const cards = section?.querySelectorAll(`.${references.projectCard.className}`);
        if (!section || !header || !cards || cards.length === 0) return;

        animatePinHeader(header, section, cards[cards.length - 1]);
        animateProjectCards(cards, projects, references, scope);
    }, { scope: rootRef, dependencies: [projects] });

    return rootRef;
}