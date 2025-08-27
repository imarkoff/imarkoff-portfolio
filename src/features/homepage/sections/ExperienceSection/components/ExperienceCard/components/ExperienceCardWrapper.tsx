"use client";

import {PropsWithChildren, useRef} from "react";
import {ExperienceCardReferences} from "../types";
import useAnimateExperienceCard
    from "@/features/homepage/sections/ExperienceSection/components/ExperienceCard/hooks/useAnimateExperienceCard";

interface ExperienceCardWrapperProps extends PropsWithChildren {
    isPresent: boolean;
    references: ExperienceCardReferences;
}

export default function ExperienceCardWrapper(
    {isPresent, references, children}: ExperienceCardWrapperProps
) {
    const rootRef = useRef<HTMLDivElement>(null);

    useAnimateExperienceCard(rootRef, isPresent, references);

    return (
        <article
            className={"flex gap-6 lg:gap-12 items-center"}
            data-testid="experience-card-wrapper"
            ref={rootRef}
        >
            {children}
        </article>
    );
}