import {RefObject} from "react";
import {useGSAP} from "@gsap/react";
import staggerForm from "../animations/staggerForm";

export default function useAnimateForm(
    cardRef: RefObject<HTMLDivElement | null>
) {
    useGSAP(() => {
        const scope = cardRef.current;
        if (!scope) return;

        staggerForm(scope);
    }, { scope: cardRef });
}