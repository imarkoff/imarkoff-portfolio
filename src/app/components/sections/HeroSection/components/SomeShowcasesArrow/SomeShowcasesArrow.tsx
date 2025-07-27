"use client";

import Typography from "@/app/components/ui/Typography";
import useWordsAnimation
    from "@/app/components/sections/HeroSection/components/SomeShowcasesArrow/hooks/useWordsAnimation";
import useArrowAnimation
    from "@/app/components/sections/HeroSection/components/SomeShowcasesArrow/hooks/useArrowAnimation";
import ArrowSVG from "@/app/components/sections/HeroSection/components/SomeShowcasesArrow/components/ArrowSVG";

export default function SomeShowcasesArrow() {
    const { pathRef, arrowRef } = useArrowAnimation();
    const { textRef } = useWordsAnimation();

    return (
        <div className={"absolute text-secondary -left-[50px] lg:-left-[150px] top-1/3 -translate-x-1/2 -translate-y-1/2"}>
            <div className={"absolute lg:translate-x-1/3 -translate-y-1/3 -top-[10px] scale-75 lg:scale-100"}>
                <ArrowSVG pathRef={pathRef} arrowRef={arrowRef} />
            </div>
            <Typography
                className={"tracking-widest font-medium !leading-none !text-center w-fit rotate-[-11deg]"}
                family={"handwritten"}
                variant={"h1"}
                ref={textRef}
            >
                some of my <br /> showcases
            </Typography>
        </div>
    );
}