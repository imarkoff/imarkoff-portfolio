import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

export default function useCarouselAppear() {
    const carouselRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!carouselRef.current) return;

        gsap.fromTo(carouselRef.current, {
            xPercent: 100,
            yPercent: 100,
            opacity: 0,
        }, {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            ease: "elastic.out(0.25)",
            duration: 3,
            delay: 1.5,
        });
    });

    return carouselRef;
}