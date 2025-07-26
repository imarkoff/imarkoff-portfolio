"use client";

import Typography from "@/app/components/ui/Typography";
import useCharsAnimation
    from "@/app/components/sections/HeroSection/components/SomeShowcasesArrow/hooks/useCharsAnimation";
import useArrowAnimation
    from "@/app/components/sections/HeroSection/components/SomeShowcasesArrow/hooks/useArrowAnimation";
import ArrowSVG from "@/app/components/sections/HeroSection/components/SomeShowcasesArrow/components/ArrowSVG";

export default function SomeShowcasesArrow() {
    const { pathRef, arrowRef } = useArrowAnimation();
    const { textRef } = useCharsAnimation();

    return (
        <div className={"absolute text-secondary right-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2"}>
            <div className={"absolute translate-x-1/3 -translate-y-1/3 -top-[10px]"}>
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