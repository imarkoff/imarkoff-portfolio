"use client";

import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {SplitText} from "gsap/SplitText";

interface HeroAnimatorProps {
    nameId: string;
    taglineId: string;
    buttonWrapperClassName: string;
    labelId: string;
}

export default function HeroAnimator({nameId, taglineId, labelId, buttonWrapperClassName}: HeroAnimatorProps) {
    useGSAP(() => {
        const nameElement = document.getElementById(nameId);
        const taglineElement = document.getElementById(taglineId);
        const labelElement = document.getElementById(labelId);
        const allButtons = document.getElementsByClassName(buttonWrapperClassName);
        if (!nameElement || !taglineElement || !labelElement || !allButtons) return;

        const nameSplitText = new SplitText(nameElement, { type: "chars" });

        const tl = gsap.timeline({});

        tl.fromTo(nameSplitText.chars, {
            opacity: 0,
            filter: "blur(8px)",
            y: 20
        }, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: 0.02,
            duration: 0.5,
            delay: 1
        });

        tl.fromTo(taglineElement, {
            opacity: 0,
            filter: "blur(8px)",
            y: 20
        }, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.5,
        }, "-=0.4");

        tl.fromTo(allButtons, {
            opacity: 0,
            filter: "blur(4px)",
            y: 20
        }, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.4,
            stagger: 0.1,
        }, "-=0.5");

        tl.fromTo(labelElement, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
        }, "-=0.3");

        return () => {
            tl.kill();
        };
    });

    return null;
}