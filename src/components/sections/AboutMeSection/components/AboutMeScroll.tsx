"use client";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface AboutMeReferences {
    aboutMeGridLayoutId: string,
    aboutMeContentColumnId: string,
    byTheNumbersContainerId: string;
    byTheNumbersHeadingId: string;
}

export default function AboutMeScroll(
    { references }: { references: AboutMeReferences }
) {
    if (!references) {
        throw new Error("References must be provided");
    }

    useGSAP(() => {
        const aboutMeGridLayout = document.getElementById(references.aboutMeGridLayoutId);
        const aboutMeContentColumn = document.getElementById(references.aboutMeContentColumnId);
        const byTheNumbersContainer = document.getElementById(references.byTheNumbersContainerId);
        const byTheNumbersHeading = document.getElementById(references.byTheNumbersHeadingId);

        if (!aboutMeGridLayout || !aboutMeContentColumn || !byTheNumbersContainer || !byTheNumbersHeading) {
            console.warn("One or more elements not found:", {
                aboutMeGridLayout,
                aboutMeContentColumn,
                byTheNumbersContainer,
                byTheNumbersHeading
            });
            return;
        }

        const tl = gsap.timeline({
            defaults: {
                ease: "power1.inOut",
                duration: 1,
            },
        });

        ScrollTrigger.create({
            trigger: aboutMeGridLayout,
            id: "about-me.scroll-trigger",
            start: "top 75%",
            end: "bottom 80%",
            // markers: true,
            scrub: 1.5,
            animation: tl
        });

        tl.fromTo(aboutMeContentColumn, {
            opacity: 0.5,
            x: -100,
        }, {
            scale: 1,
            opacity: 1,
            x: 0,
        }, "<");

        tl.fromTo(byTheNumbersContainer, {
            opacity: 0.5,
            x: 100,
        }, {
            scale: 1,
            opacity: 1,
            x: 0,
        }, "<");

        tl.fromTo(byTheNumbersHeading, {
            opacity: 0,
            y: -20,
        }, {
            opacity: 1,
            y: 0,
        });
    });
    return null;
}