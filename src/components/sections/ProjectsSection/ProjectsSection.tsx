import Project from "@/lib/models/Project";
import Section from "@/components/ui/Section";
import Typography from "@/components/ui/Typography";
import TypographyIcon from "@/components/ui/TypographyIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import ProjectCard from "@/components/sections/ProjectsSection/components/ProjectCard/ProjectCard";
import Technology from "@/lib/models/Technology";

interface ProjectsSectionProps {
    projects: Project[];
    projectsTechnologies: Technology[][];
}

export default function ProjectsSection(
    {projects, projectsTechnologies}: ProjectsSectionProps
) {
    return (
        <Section slotProps={{
            section: { className: "flex flex-col items-center gap-12" }
        }}>
            <div className={"w-full flex flex-col lg:items-center gap-2.5"}>
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
            <div className={"grid grid-cols-1 gap-20"}>
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