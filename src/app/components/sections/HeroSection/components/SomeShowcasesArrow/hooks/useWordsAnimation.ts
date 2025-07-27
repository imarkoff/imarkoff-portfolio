import gsap from "gsap";
import {SplitText} from "gsap/SplitText";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";

export default function useWordsAnimation() {
    const textRef = useRef<HTMLParagraphElement>(null);

    gsap.registerPlugin(SplitText);

    useGSAP(() => {
        if (!textRef.current) return;

        const splitText = new SplitText(textRef.current, { type: "words" });

        gsap.from(splitText.words, {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            ease: "power2.out",
            delay: 3
        })
    }, []);

    return { textRef };
}