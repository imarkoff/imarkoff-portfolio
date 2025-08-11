"use client";

import {ProjectsSectionReferences} from "@/components/sections/ProjectsSection/types";
import Project from "@/lib/models/Project";
import Section from "@/components/ui/Section";
import useAnimateProjectCards from "@/components/sections/ProjectsSection/hooks/useAnimateProjectCards";
import {CSSProperties, PropsWithChildren} from "react";
import {DEFAULT_HUE, SPACE_BETWEEN_HEADER_AND_PROJECTS} from "@/components/sections/ProjectsSection/constants";

interface ProjectAnimationWrapperProps extends PropsWithChildren {
    references: ProjectsSectionReferences;
    projects: Project[];
}

export default function ProjectAnimationWrapper(
    {references, projects, children}: ProjectAnimationWrapperProps
) {
    const rootRef = useAnimateProjectCards(references, projects);

    return (
        <Section slotProps={{
            root: {
                ref: rootRef,
                style: {
                    "--gradient-hue": DEFAULT_HUE,
                    "--gradient-color": "hsla(var(--gradient-hue), 100%, 50%, 0.15)",
                    background: "radial-gradient(45% 45% at 50% 7%, var(--gradient-color) 1%, #FF000000 99%),radial-gradient(45% 45% at -6% 74%, var(--gradient-color) 1%, #FF000000 99%)"
                } as CSSProperties
            },
            section: { className: "flex flex-col items-center", style: { gap: `${SPACE_BETWEEN_HEADER_AND_PROJECTS}px` } }
        }
        }>
            {children}
        </Section>
    );
}