import gsap from "gsap";
import {SplitText} from "gsap/SplitText";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";

export default function useCharsAnimation() {
    const textRef = useRef<HTMLParagraphElement>(null);

    gsap.registerPlugin(SplitText);

    useGSAP(() => {
        if (!textRef.current) return;

        const splitText = new SplitText(textRef.current, { type: "lines, words, chars" });

        gsap.from(splitText.chars, {
            opacity: 0,
            y: 20,
            stagger: {
                amount: 0.5,
                from: "start",
                ease: "power2.inOut"
            },
            duration: 0.5,
            delay: 3
        })
    }, []);

    return { textRef };
}