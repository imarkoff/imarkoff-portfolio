import clsx from "clsx";
import {Typography} from "@/components/ui/Typography";
import {ProjectCardContentReference,ProjectCardProps} from "../types";
import ProjectCardLinks from "./ProjectCardLinks";
import ProjectCardHeader from "./ProjectCardHeader";
import {SlugTechnologyLabel} from "@/components/ui/TechnologyLabel";

interface ProjectCardContentProps extends Omit<ProjectCardProps, 'references'> {
    references?: ProjectCardContentReference;
}

export default function ProjectCardContent(
    {project, index, references}: ProjectCardContentProps
) {
    return (
        <div className={clsx(
            references?.className,
            "flex flex-col gap-4 lg:col-span-4",
            "p-4 lg:px-10"
        )}>
            <ProjectCardHeader
                project={project}
                index={index}
            />
            <Typography>
                {project.shortDescription}
            </Typography>
            <div
                className={"w-full relative flex gap-2.5 mask-type-luminance overflow-hidden"}
                style={{maskImage: "linear-gradient(to right, black 0%, black 90%, transparent 100%)"}}
            >
                {project.coreTechs.map((slug, index) => (
                    <SlugTechnologyLabel
                        className={references?.techLabelClassName}
                        technologySlug={slug}
                        key={index}
                    />
                ))}
            </div>
            <ProjectCardLinks project={project} />
        </div>
    );
}