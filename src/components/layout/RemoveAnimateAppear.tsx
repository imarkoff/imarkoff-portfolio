"use client";
import {useGSAP} from "@gsap/react";

export default function RemoveAnimateAppear() {
    useGSAP(() => {
        const elements = document.querySelectorAll("[data-animate-appear]");
        elements.forEach((element) => {
            element.removeAttribute("data-animate-appear");
        });
    });

    return null;
}