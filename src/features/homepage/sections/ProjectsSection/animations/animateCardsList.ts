import Project from "@/lib/models/Project";
import animateCardStacking from "@/features/homepage/sections/ProjectsSection/animations/animateCardStacking";
import animateRootGradient from "@/features/homepage/sections/ProjectsSection/animations/animateRootGradient";

export default function animateCardsList(
    cards: NodeListOf<Element>,
    projects: Project[],
    scope: HTMLElement
) {
    const lastCard = cards[cards.length - 1];

    cards.forEach((card, index) => {
        const indexFromEnd = cards.length - 1 - index;
        const project = projects[index];
        const prevProject = projects[index - 1] || null;

        animateCardStacking(card, index, indexFromEnd, lastCard);
        animateRootGradient(project, prevProject, scope, card, index);
    });
}