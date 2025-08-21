import {RefObject} from "react";
import {useGSAP} from "@gsap/react";
import staggerIntro from "@/components/sections/ContactMeSection/animations/staggerIntro";

export default function useAnimateIntro(
    introRef: RefObject<HTMLDivElement | null>
) {
    useGSAP(() => {
        const scope = introRef.current;
        if (!scope) return;

        staggerIntro(scope);
    }, {scope: introRef});
}