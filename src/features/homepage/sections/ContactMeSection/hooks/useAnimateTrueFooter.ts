import {RefObject} from "react";
import {useGSAP} from "@gsap/react";
import animateTrueFooter from "../animations/animateTrueFooter";

export default function useAnimateTrueFooter(
    footerRef: RefObject<HTMLDivElement | null>
) {
    useGSAP(() => {
        const scope = footerRef.current;
        if (!scope) return;

        animateTrueFooter(scope);
    }, {scope: footerRef});
}