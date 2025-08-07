import Project from "@/lib/models/Project";
import Typography from "@/components/ui/Typography";
import TypographyIcon from "@/components/ui/TypographyIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import ProjectCard from "@/components/sections/ProjectsSection/components/ProjectCard/ProjectCard";
import Technology from "@/lib/models/Technology";
import {ProjectsSectionReferences} from "@/components/sections/ProjectsSection/types";
import ProjectAnimationWrapper from "@/components/sections/ProjectsSection/components/ProjectAnimationWrapper";

interface ProjectsSectionProps {
    projects: Project[];
    projectsTechnologies: Technology[][];
}

export default function ProjectsSection(
    {projects, projectsTechnologies}: ProjectsSectionProps
) {
    const references: ProjectsSectionReferences = {
        projectsSectionId: "projects__section",
        projectsHeaderId: "projects__header",
        projectCard: {
            className: "projects__project-card",
            content: {
                className: "projects__project-card__content",
                techLabelClassName: "projects__project-card__tech-label"
            }
        }
    };

    return (
        <ProjectAnimationWrapper
            references={references}
            projects={projects}
        >
            <div
                id={references.projectsHeaderId}
                className={"w-full flex flex-col lg:items-center gap-2.5 z-10"}
            >
                <div className={"flex items-center lg:justify-center gap-2.5"}>
                    <TypographyIcon
                        Icon={CodeIcon}
                        variant={"h1"}
                    />
                    <Typography variant={"h1"} component={"h2"}>
                        Projects
                    </Typography>
                </div>
                <Typography>
                    I've built from zero to a ready for production products.
                </Typography>
            </div>
            <div
                id={references.projectsSectionId}
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
        </ProjectAnimationWrapper>
    );
}