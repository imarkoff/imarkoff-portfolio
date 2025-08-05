import Typography from "@/components/ui/Typography";
import Label from "@/components/ui/Label";
import projectTypeMetadata from "@/lib/constants/projectTypeMetadata";
import TechnologyLabel from "@/components/common/TechnologyLabel";
import LinkButton from "@/components/ui/Button/LinkButton";
import ArrowForwardIcon from "@/components/icons/ArrowForwardIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import {ProjectCardProps} from "@/components/sections/ProjectsSection/components/ProjectCard/types";
import clsx from "clsx";

export default function ProjectCardContent(
    {project, techs, index}: ProjectCardProps
) {
    return (
        <div className={clsx(
            "h-full flex flex-col gap-4 justify-center lg:col-span-4",
            "p-4 lg:px-10"
        )}>
            <ContentHeader
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
                {techs.map((tech, index) => (
                    <TechnologyLabel technology={tech} key={index}/>
                ))}
            </div>
            <ContentLinks project={project} />
        </div>
    );
}

const ContentHeader = (
    {project, index}: {project: ProjectCardProps['project'], index: ProjectCardProps['index']}
) => {
    const metadata = project.type ? projectTypeMetadata[project.type] : undefined;

    return (
        <div className={"flex flex-wrap items-center gap-x-4 gap-y-2.5"}>
            <div className={"relative"}>
                <Typography
                    component={"span"}
                    variant={"hero"}
                    className={"absolute !text-8xl !leading-none -bottom-2 -left-7 mix-blend-overlay"}
                >
                    {index + 1}
                </Typography>
                <Typography variant={"h1"} component={"h3"} className={"!leading-none"}>
                    {project.name}
                </Typography>
            </div>
            <div className={"flex flex-wrap gap-2.5 items-center"}>
                {project.type && (
                    <Label color={metadata?.color} rounded>
                        {metadata?.label || project.type}
                    </Label>
                )}
                {project.githubStats?.show && (
                    <Label color={"yellow"} rounded>
                        {project.githubStats.stars || "0"}+ ⭐ on GitHub
                    </Label>
                )}
            </div>
        </div>
    );
}

const ContentLinks = (
    {project}: { project: ProjectCardProps['project'] }
) => {
    const sourceCodeUrl = project.sourceCodeUrl ? new URL(project.sourceCodeUrl) : undefined;

    return (
        <div className={"flex flex-wrap gap-2.5"}>
            <LinkButton
                href={(route) => route.projects.children.projectBySlug.path(project.slug)}
                variant={"primary"}
                RightIcon={ArrowForwardIcon}
            >
                View Case Study
            </LinkButton>
            {project.sourceCodeUrl && (
                <LinkButton
                    href={project.sourceCodeUrl}
                    target={"_blank"}
                    title={'View Source Code'}
                    variant={"tertiary"}
                    LeftIcon={sourceCodeUrl?.hostname === "github.com" ? GitHubIcon : CodeIcon}
                    isIconButton
                />
            )}
        </div>
    );
}