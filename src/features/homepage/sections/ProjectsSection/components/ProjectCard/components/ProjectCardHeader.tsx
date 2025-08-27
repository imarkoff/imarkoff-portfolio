import projectTypeMetadata from "@/lib/constants/projectTypeMetadata";
import {Typography} from "@/components/ui/Typography";
import Label from "@/components/ui/Label";
import Project from "@/lib/models/Project";

export default function ProjectCardHeader(
    {project, index}: {project: Project, index: number}
) {
    const metadata = project.type ? projectTypeMetadata[project.type] : undefined;

    return (
        <div className={"flex flex-wrap items-center gap-x-4 gap-y-2.5"}>
            <div className={"relative"}>
                <Typography
                    component={"span"}
                    variant={"hero"}
                    className={"absolute !text-8xl !leading-none -bottom-2 -left-7 opacity-10"}
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