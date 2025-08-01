import ProjectImage from "@/components/sections/ProjectsSection/components/ProjectCard/ProjectImage";
import ProjectCardContent from "@/components/sections/ProjectsSection/components/ProjectCard/ProjectCardContent";
import {ProjectCardProps} from "@/components/sections/ProjectsSection/components/ProjectCard/types";

export default function ProjectCard({project, techs, index}: ProjectCardProps) {
    return (
        <article className={"grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-2.5 items-center justify-between"}>
            <ProjectImage heroImage={project.heroImage} />
            <ProjectCardContent project={project} techs={techs} index={index} />
        </article>
    );
}

