import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

export default function useNavbarAppear() {
    const navbarRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const navbarContainer = navbarRef.current;
        if (!navbarContainer) return;

        gsap.fromTo(navbarContainer, {
            yPercent: -100,
            opacity: 0,
        }, {
            delay: 1.75,
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: "elastic.out(0.5)",
        });
    });

    return navbarRef;
}