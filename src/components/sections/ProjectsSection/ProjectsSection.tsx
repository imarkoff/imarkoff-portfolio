import Project from "@/lib/models/Project";
import Section from "@/components/ui/Section";
import Typography from "@/components/ui/Typography";
import TypographyIcon from "@/components/ui/TypographyIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import ProjectCard from "@/components/sections/ProjectsSection/components/ProjectCard/ProjectCard";
import Technology from "@/lib/models/Technology";
import AnimateProjectCards from "@/components/sections/ProjectsSection/components/AnimateProjectCards";

interface ProjectsSectionProps {
    projects: Project[];
    projectsTechnologies: Technology[][];
}

export default function ProjectsSection(
    {projects, projectsTechnologies}: ProjectsSectionProps
) {
    const references = {
        projectsSectionId: "projects.section",
        projectsHeaderId: "projects.header",
    };

    return (
        <Section slotProps={{
            section: { className: "flex flex-col items-center gap-12" }
        }}>
            <AnimateProjectCards references={references} />
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
                        techs={projectsTechnologies[index]}
                        key={index}
                        index={index}
                    />
                ))}
            </div>
        </Section>
    );
}