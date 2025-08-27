import Project from "@/lib/models/Project";
import ProjectAnimationWrapper from "@/features/homepage/sections/ProjectsSection/components/ProjectAnimationWrapper";
import {REFERENCES} from "@/features/homepage/sections/ProjectsSection/constants";
import ProjectsHeader from "@/features/homepage/sections/ProjectsSection/components/ProjectsHeader";
import ProjectList from "@/features/homepage/sections/ProjectsSection/components/ProjectList";

interface ProjectsSectionProps {
    projects: Project[];
}

export default function ProjectsSection(
    {projects}: ProjectsSectionProps
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
            />
        </ProjectAnimationWrapper>
    );
}