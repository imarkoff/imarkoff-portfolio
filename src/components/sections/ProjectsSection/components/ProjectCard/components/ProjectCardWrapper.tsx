"use client";

import {PropsWithChildren} from "react";
import clsx from "clsx";
import dottedBackground from "@/utils/dottedBackground";
import {ProjectCardProps} from "../types";
import useProjectCardStyles from "../hooks/useProjectCardStyles";
import useCardContentAppear from "../hooks/useCardContentAppear";

interface ProjectCardWrapperProps extends PropsWithChildren {
    project: ProjectCardProps['project'];
    references: ProjectCardProps['references'];
    index: ProjectCardProps['index'];
}

export default function ProjectCardWrapper(
    {project, references, index, children}: ProjectCardWrapperProps
) {
    const styles = useProjectCardStyles(project);
    const cardRef = useCardContentAppear(references, index);

    return (
        <article
            className={clsx(
                references?.className,
                "sticky top-1/4 items-center grid grid-cols-1 lg:grid-cols-12 overflow-hidden",
                "border-2 box-border border-solid rounded-3xl",
                {"border-border-menu": !project.colors}
            )}
            ref={cardRef}
            style={styles}
        >
            <div
                className={"pointer-events-none absolute inset-0 -z-0"}
                style={dottedBackground("rgba(255, 255, 255, 0.05)", "1px", "14px")}
            />
            {children}
        </article>
    );
}