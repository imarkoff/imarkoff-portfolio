import TypographyIcon from "@/components/ui/TypographyIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import Typography from "@/components/ui/Typography";

export default function ProjectsHeader({id}: {id: string}) {
    return (
        <div
            id={id}
            data-testid={"projects-header-container"}
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
    );
}