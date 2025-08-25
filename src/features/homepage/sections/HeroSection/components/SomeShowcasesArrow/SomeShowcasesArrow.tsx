"use client";

import {Typography} from "@/components/ui/Typography";
import useShowcaseAppear
    from "@/features/homepage/sections/HeroSection/components/SomeShowcasesArrow/hooks/useShowcaseAppear";
import ArrowSVG from "@/features/homepage/sections/HeroSection/components/SomeShowcasesArrow/components/ArrowSVG";

export default function SomeShowcasesArrow() {
    const { pathRef, arrowRef, textRef } = useShowcaseAppear()

    return (
        <div className={"absolute text-secondary -left-[50px] lg:-left-[150px] top-1/3 -translate-x-1/2 -translate-y-1/2"}>
            <div
                className={"absolute lg:translate-x-1/3 -translate-y-1/3 -top-[10px] scale-75 lg:scale-100"}
                data-testid={"arrow-svg-container"}
            >
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