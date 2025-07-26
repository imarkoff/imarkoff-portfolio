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
            position: "absolute",
            paddingLeft: "40px",
            yPercent: 100,
            y: 20
        }, {
            opacity: 1,
            filter: "blur(0px)",
            position: "relative",
            yPercent: 100,
            paddingLeft: "40px",
            y: 0,
            stagger: 0.1,
            duration: 0.5
        });
        tl.fromTo(greetingHiElement, {
            transform: "scale(3)",
            paddingLeft: "40px",
            yPercent: 100,
        }, {
            transform: "scale(1)",
            xPercent: 0,
            yPercent: 0,
            paddingLeft: 0,
            duration: 0.5,
            delay: 1,
        })
        tl.fromTo(greetingOtherElement, {
            opacity: 0,
            paddingLeft: "20px",
            paddingRight: "20px",
            y: 20
        }, {
            opacity: 1,
            filter: "blur(0px)",
            paddingLeft: 0,
            paddingRight: 0,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
        }, "<");

        return () => {
            tl.kill();
        };
    });

    return null;
}