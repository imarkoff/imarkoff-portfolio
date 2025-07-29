"use client";

import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {SplitText} from "gsap/SplitText";
import {HeroAnimatorProps} from "@/components/sections/HeroSection/types";

export default function AnimateHero(
    {greeting, nameId, taglineId, labelId, buttonWrapperClassName}: HeroAnimatorProps
) {
    useGSAP(() => {
        const elements = {
            greetingHi: document.getElementById(greeting.hiId),
            greetingOther: document.getElementById(greeting.otherId),
            name: document.getElementById(nameId),
            tagline: document.getElementById(taglineId),
            label: document.getElementById(labelId)
        }
        const allButtons = document.getElementsByClassName(buttonWrapperClassName);

        if (Object.values(elements).some (el => el === null) || allButtons.length === 0) {
            console.warn("AnimateHero: One or more elements not found. Animation will not run.");
            return () => {};
        }

        const tl = gsap.timeline({});

        animateGreeting(tl, elements.greetingHi!, elements.greetingOther!);
        animateName(tl, elements.name!);
        animateTagline(tl, elements.tagline!);
        animateButtons(tl, allButtons);
        animateLabel(tl, elements.label!);

        return () => {
            tl.kill();
        };
    });

    return null;
}

function animateGreeting(
    tl: gsap.core.Timeline,
    greetingHiElement: HTMLElement,
    greetingOtherElement: HTMLElement
) {
    tl.fromTo(greetingHiElement, {
        opacity: 0,
        filter: "blur(4px)",
        y: 20
    }, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        stagger: 0.1,
        duration: 0.5
    });
    tl.fromTo(greetingHiElement, {
        transform: "scale(3)",
        yPercent: 100,
    }, {
        transform: "scale(1)",
        yPercent: 0,
        duration: 0.5,
        delay: 0.5,
    })
    tl.fromTo(greetingOtherElement, {
        opacity: 0,
        y: 40,
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
    }, "<");
}

function animateName(
    tl: gsap.core.Timeline,
    nameElement: HTMLElement
) {
    const nameSplitText = new SplitText(nameElement, { type: "chars" });

    tl.fromTo(nameSplitText.chars, {
        opacity: 0,
        filter: "blur(8px)",
        y: 20
    }, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        stagger: 0.02,
        duration: 0.5
    }, "-=0.4");
}

function animateTagline(
    tl: gsap.core.Timeline,
    taglineElement: HTMLElement
) {
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
}

function animateButtons(
    tl: gsap.core.Timeline,
    allButtons: HTMLCollectionOf<Element>
) {
    tl.fromTo(allButtons, {
        opacity: 0,
        filter: "blur(4px)",
        y: 20
    }, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.4,
        stagger: 0.1
    }, "-=0.5");

    tl.set(allButtons, {
        clearProps: "all"
    });
}

function animateLabel(
    tl: gsap.core.Timeline,
    labelElement: HTMLElement
) {
    tl.fromTo(labelElement, {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 1,
    }, "-=0.3");
}