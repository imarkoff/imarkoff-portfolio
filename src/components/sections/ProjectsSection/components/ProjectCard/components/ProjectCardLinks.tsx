import {LinkButton} from "@/components/ui/Button";
import ArrowForwardIcon from "@/components/icons/ArrowForwardIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import Project from "@/lib/models/Project";
import {RouteConfig} from "@/config/routeConfig";

export default function ProjectCardLinks(
    {project}: {project: Project}
) {
    const sourceCodeUrl = project.sourceCodeUrl ? new URL(project.sourceCodeUrl) : undefined;

    const projectRoute = (route: RouteConfig) =>
        route.projects.children.projectBySlug.path(project.slug);

    return (
        <div className={"flex flex-wrap gap-2.5"}>
            <LinkButton
                href={projectRoute}
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