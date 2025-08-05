import ProjectImage from "@/components/sections/ProjectsSection/components/ProjectCard/ProjectImage";
import ProjectCardContent from "@/components/sections/ProjectsSection/components/ProjectCard/ProjectCardContent";
import {ProjectCardProps} from "@/components/sections/ProjectsSection/components/ProjectCard/types";
import clsx from "clsx";
import dottedBackground from "@/utils/dottedBackground";

export default function ProjectCard({project, techs, index}: ProjectCardProps) {
    const colors = project.colors ? {
        textPrimary: `hsla(${project.colors.primaryHue}, 68%, 95%, 1)`,
        primary: `hsla(${project.colors.primaryHue}, 76%, 60%, 1)`,
        onPrimary: `hsla(${project.colors.primaryHue}, 31%, 20%, 1)`,
        primaryHover: `hsla(${project.colors.primaryHue}, 82%, 75%, 1)`,
        primaryDisabled: `hsla(${project.colors.primaryHue}, 79%, 68%, 0.5)`,
        primaryShadow: `hsla(${project.colors.primaryHue}, 76%, 60%, 0.1)`,
    } : undefined;

    return (
        <article
            className={clsx(
                "sticky top-1/4 project-card grid grid-cols-1 lg:grid-cols-12 overflow-hidden",
                "border-2 box-border border-solid rounded-3xl",
                {"border-border-menu": !colors}
            )}
            style={{
                // @ts-expect-error 2353 - CSS variables are not recognized by TypeScript
                "--primary-hue": project.colors?.primaryHue,
                "--color-primary": colors?.textPrimary,
                "--color-active-filled": colors?.primary,
                "--color-on-active-filled": colors?.onPrimary,
                "--color-active-filled-hover": colors?.primaryHover,
                "--color-active-filled-disabled": colors?.primaryDisabled,
                background: project.colors?.background
                    ? `${project.colors.background}, var(--color-background)`
                    : "var(--color-background)",
                borderColor: colors?.primary,
                boxShadow: `0px 6px 40px 0px ${colors?.primaryShadow || "rgba(0, 0, 0, 0.1)"}`,
            }}
        >
            <div
                className={"pointer-events-none absolute inset-0 -z-0"}
                style={dottedBackground("rgba(255, 255, 255, 0.05)", "1px", "14px")}
            />
            <ProjectCardContent project={project} techs={techs} index={index} />
            <ProjectImage heroImage={project.heroImage} />
        </article>
    );
}

