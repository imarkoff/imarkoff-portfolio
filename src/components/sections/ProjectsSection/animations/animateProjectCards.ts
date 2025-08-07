import Project from "@/lib/models/Project";
import { ProjectsSectionReferences } from "@/components/sections/ProjectsSection/types";
import animateCardStacking from "@/components/sections/ProjectsSection/animations/animateCardStacking";
import animateRootGradient from "@/components/sections/ProjectsSection/animations/animateRootGradient";
import animateCardContentAppear from "@/components/sections/ProjectsSection/animations/animateCardContentAppear";

export default function animateProjectCards(
    cards: NodeListOf<Element>,
    projects: Project[],
    references: ProjectsSectionReferences,
    scope: HTMLElement
) {
    const lastCard = cards[cards.length - 1];

    cards.forEach((card, index) => {
        const indexFromEnd = cards.length - 1 - index;
        const project = projects[index];
        const prevProject = projects[index - 1] || null;

        animateCardStacking(card, index, indexFromEnd, lastCard);
        animateRootGradient(project, prevProject, scope, card, index);

        const cardContent = card.querySelector(`.${references.projectCard.content.className}`);
        const techLabels = card.querySelectorAll(`.${references.projectCard.content.techLabelClassName}`);
        if (cardContent) {
            animateCardContentAppear(cardContent, techLabels, index);
        }
    });
}