"use client";

import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";
import gsap from "gsap";

export default function GreetingAnimator({greetingHiId, greetingOtherId}: { greetingHiId: string, greetingOtherId: string }) {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(SplitText);

    useGSAP(() => {
        const greetingHiElement = document.getElementById(greetingHiId);
        const greetingOtherElement = document.getElementById(greetingOtherId);
        if (!greetingOtherElement || !greetingHiElement) return;

        const tl = gsap.timeline({});

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

        return () => {
            tl.kill();
        };
    });

    return null;
}