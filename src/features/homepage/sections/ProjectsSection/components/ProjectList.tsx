import Project from "@/lib/models/Project";
import ProjectCard from "@/features/homepage/sections/ProjectsSection/components/ProjectCard/ProjectCard";
import {ProjectsSectionReferences} from "@/features/homepage/sections/ProjectsSection/types";

interface ProjectListProps {
    references: ProjectsSectionReferences;
    projects: Project[];
}

export default function ProjectList(
    {references, projects}: ProjectListProps
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
                    key={index}
                    index={index}
                />
            ))}
        </div>
    );
}