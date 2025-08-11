import Project from "@/lib/models/Project";
import Technology from "@/lib/models/Technology";
import ProjectAnimationWrapper from "@/components/sections/ProjectsSection/components/ProjectAnimationWrapper";
import {REFERENCES} from "@/components/sections/ProjectsSection/constants";
import ProjectsHeader from "@/components/sections/ProjectsSection/components/ProjectsHeader";
import ProjectList from "@/components/sections/ProjectsSection/components/ProjectList";

interface ProjectsSectionProps {
    projects: Project[];
    projectsTechnologies: Technology[][];
}

export default function ProjectsSection(
    {projects, projectsTechnologies}: ProjectsSectionProps
) {
    return (
        <ProjectAnimationWrapper
            references={REFERENCES}
            projects={projects}
        >
            <ProjectsHeader id={REFERENCES.projectsHeaderId} />
            <ProjectList
                references={REFERENCES}
                projects={projects}
                projectsTechnologies={projectsTechnologies}
            />
        </ProjectAnimationWrapper>
    );
}