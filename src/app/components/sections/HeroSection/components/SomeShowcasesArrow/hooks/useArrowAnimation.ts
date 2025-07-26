import {useRef} from "react";
import gsap from "gsap";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import {useGSAP} from "@gsap/react";

export default function useArrowAnimation() {
    const pathRef = useRef<SVGPathElement>(null);
    const arrowRef = useRef<SVGPathElement>(null);

    gsap.registerPlugin(MotionPathPlugin);

    useGSAP(() => {
        if (!pathRef.current || !arrowRef.current) return;

        const pathLength = pathRef.current.getTotalLength();

        const tl = gsap.timeline({
            defaults: {
                stroke: "currentColor",
            }
        });

        tl.set(arrowRef.current, {
            motionPath: {
                path: pathRef.current,
                autoRotate: true,
            },
            stroke: "currentColor",
            xPercent: -30,
            yPercent: -55,
            transformOrigin: "center center",
        });

        tl.fromTo(pathRef.current, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        }, {
            strokeDasharray: pathLength,
            strokeDashoffset: 0,
            duration: 2,
            ease: "power3.out",
            delay: 3
        });


        tl.fromTo(arrowRef.current, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.5
        }, "-=1");
    }, []);

    return { pathRef, arrowRef };
}