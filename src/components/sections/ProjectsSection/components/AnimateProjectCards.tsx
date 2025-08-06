"use client";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimateProjectCardsProps {
    references: {
        projectsSectionId: string;
        projectsHeaderId: string;
    }
}

export default function AnimateProjectCards(
    { references: { projectsSectionId, projectsHeaderId } }: AnimateProjectCardsProps
) {
    useGSAP(() => {
        const section = document.getElementById(projectsSectionId);
        const header = document.getElementById(projectsHeaderId);
        if (!section || !header) return;

        const cards = section.querySelectorAll(".project-card");
        if (cards.length === 0) return;

        const tl = gsap.timeline({});

        const lastCard = cards[cards.length - 1];

        tl.to(header, {
            scrollTrigger: {
                trigger: header,
                start: `bottom 25%-=50`,
                end: `bottom+=${section.offsetHeight + 50 - lastCard.clientHeight * 2 + cards[0].clientHeight} 25%`,
                scrub: true,
                pin: true,
                id: "projects-header-pin",
                pinSpacing: false,
                markers: true
            },
        });

        cards.forEach((card, index) => {
            const indexFromEnd = cards.length - 1 - index;
            const heightDiffWithLastCard = lastCard.clientHeight - card.clientHeight;

            tl.fromTo(card, {
                filter: "blur(0) brightness(1)",
            }, {
                scrollTrigger: {
                    trigger: card,
                    start: `bottom center`,
                    end: `bottom top`,
                    id: `project-card-${index}`,
                    scrub: true,
                    markers: true
                },
                y: -indexFromEnd * 25,
                marginBottom: heightDiffWithLastCard,
                filter: `blur(${Math.min(indexFromEnd * 2, 8)}px) brightness(${Math.max(1 - indexFromEnd * 0.2, 0.5)})`,
                scale: 1 - indexFromEnd * 0.05,
            }, "<");
        });
    });

    return null;
}