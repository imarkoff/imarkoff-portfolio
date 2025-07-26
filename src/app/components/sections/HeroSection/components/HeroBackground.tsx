"use client";

import {useGSAP} from "@gsap/react";
import gsap from "gsap";

export default function HeroBackground() {
    useGSAP(() => {
        const radiantBackgrounds = document.querySelectorAll(".hero-gradient");
        if (radiantBackgrounds.length === 0) return;

        gsap.fromTo(radiantBackgrounds, {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.75,
            ease: "power1.out",
            stagger: 1,
        });
    });

    return (
        <div className={"absolute inset-0 z-0"}>
            <div className={"hero-gradient absolute inset-0"} style={{
                backgroundSize: "100% 100%",
                backgroundPosition: "0px 0px",
                backgroundImage: "radial-gradient(40% 70% at 55% 72%, #4903FF12 0%, #073AFF00 100%)",
                boxShadow: "0px 12px 100px 0px rgba(67, 7, 38, 0.25)"
            }} />
            <div className={"hero-gradient absolute inset-0"} style={{
                backgroundSize: "100% 100%",
                backgroundPosition: "0px 0px",
                backgroundImage: "radial-gradient(113% 91% at 16% 45%, #EE00FF0A 1%, #FF000000 99%)",
            }} />
            <div className={"hero-gradient absolute inset-0"} style={{
                backgroundSize: "100% 100%",
                backgroundPosition: "0px 0px",
                backgroundImage: "radial-gradient(50% 91% at -3% 48%, #CF00FF1A 1%, #FF000000 99%)",
            }} />
            <div className={"hero-gradient absolute inset-0"} style={{
                backgroundSize: "100% 100%",
                backgroundPosition: "0px 0px",
                backgroundImage: "radial-gradient(75% 75% at 126% 0%, #FF000033 1%, #FF000000 99%)",
            }} />
        </div>
    );
}