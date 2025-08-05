"use client";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimateProjectCards(
    { projectsSectionId }: { projectsSectionId: string }
) {
    useGSAP(() => {
        const section = document.getElementById(projectsSectionId);
        if (!section) return;

        const cards = section.querySelectorAll(".project-card");
        if (cards.length === 0) return;

        const tl = gsap.timeline({});

        cards.forEach((card, index) => {
            tl.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: () => `bottom center`,
                    end: () => `bottom top`,
                    scrub: true,
                    markers: true
                },
                ease: "none",
                y: -(cards.length -1 - index) * 35,
                scale: 1 - (cards.length -1 - index) * 0.05,
            });
        });
    });

    return null;
}