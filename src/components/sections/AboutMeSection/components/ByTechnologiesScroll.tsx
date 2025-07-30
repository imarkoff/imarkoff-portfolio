"use client";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface References {
    containerId: string;
    titleId: string;
}

export default function ByTechnologiesScroll(
    { references }: { references: References }
) {
    useGSAP(() => {
       const container = document.getElementById(references.containerId);
       const title = document.getElementById(references.titleId);

       if (!container || !title) return;

       const tl = gsap.timeline({ });

       ScrollTrigger.create({
           trigger: container,
           id: "technologies.scroll-trigger",
           start: "top 75%",
           end: "500px bottom",
           // markers: true,
           scrub: 1,
           animation: tl
       });

        tl.fromTo(container, {
            scale: 1.2,
            opacity: 0.5,
            y: 100
        }, {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power1.inOut",
            duration: 1,
        });

        tl.fromTo(title, {
            opacity: 0
        }, {
            opacity: 1
        }, "-=0.5");

    });

    return null;
}