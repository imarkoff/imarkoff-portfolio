import Project from "@/lib/models/Project";
import Technology from "@/lib/models/Technology";
import ProjectCard from "@/components/sections/ProjectsSection/components/ProjectCard/ProjectCard";
import {ProjectsSectionReferences} from "@/components/sections/ProjectsSection/types";

interface ProjectListProps {
    references: ProjectsSectionReferences;
    projects: Project[];
    projectsTechnologies: Technology[][];
}

export default function ProjectList(
    {references, projects, projectsTechnologies}: ProjectListProps
) {
    return (
        <div
            id={references.projectsListId}
            data-testid={"projects-list"}
            className={"relative grid grid-cols-1 gap-52"}
        >
            {projects.map((item, index) => (
                <ProjectCard
                    project={item}
                    references={references.projectCard}
                    techs={projectsTechnologies[index]}
                    key={index}
                    index={index}
                />
            ))}
        </div>
    );
}