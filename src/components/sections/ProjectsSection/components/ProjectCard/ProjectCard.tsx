import ProjectCardImage from "./components/ProjectCardImage";
import ProjectCardContent from "./components/ProjectCardContent";
import {ProjectCardProps} from "./types";
import ProjectCardWrapper from "./components/ProjectCardWrapper";

export default function ProjectCard({project, techs, index, references}: ProjectCardProps) {
    return (
        <ProjectCardWrapper
            project={project}
            references={references}
            index={index}
        >
            <ProjectCardContent
                project={project}
                references={references?.content}
                techs={techs}
                index={index}
            />
            <ProjectCardImage heroImage={project.heroImage} />
        </ProjectCardWrapper>
    );
}

