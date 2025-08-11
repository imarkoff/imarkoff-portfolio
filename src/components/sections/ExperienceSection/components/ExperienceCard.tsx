import clsx from "clsx";
import dayjs from "dayjs";
import ExperienceItem from "@/lib/models/ExperienceItem";
import Typography from "@/components/ui/Typography";
import ExperienceType from "@/lib/models/types/ExperienceType";
import ReactMarkdown from "react-markdown";
import TypographyIcon from "@/components/ui/TypographyIcon";
import WorkIcon from "@/components/icons/WorkIcon";
import SchoolIcon from "@/components/icons/SchoolIcon";
import CommitIcon from "@/components/icons/CommitIcon";

interface ExperienceCardProps {
    experience: ExperienceItem;
    index: {
        current: number;
        total: number;
    }
}

export default function ExperienceCard(
    {experience, index}: ExperienceCardProps
) {
    const experienceWork = experience.type === ExperienceType.Work ? experience : null;
    const experienceEducation = experience.type === ExperienceType.Education ? experience : null;

    const title = experienceWork?.position || experienceEducation?.degree || "Experience";
    const company = experienceWork?.organization || experienceEducation?.institution || "Unknown";

    const Icon = experienceWork ? WorkIcon : SchoolIcon;

    return (
        <article className={"flex gap-12 items-center"}>
            <div className={"flex-1 flex flex-col"}>
                <Typography component={"h3"} variant={"h2"}>
                    {title}
                </Typography>
                <Typography component={"h4"} variant={"h3"} className={"text-secondary"}>
                    at {company}
                </Typography>
                <Typography className={"flex gap-1.5 items-center"}>
                    <TypographyIcon Icon={CommitIcon} variant={"body"} />
                    <span>
                        {dayjs(experience.startDate).format("MMM YYYY")} - {experience.endDate ? dayjs(experience.endDate).format("MMM YYYY") : "Present"}
                    </span>
                </Typography>
            </div>
            <div className={"flex flex-col items-center self-stretch gap-2.5"}>
                <div className={clsx(
                    "flex-1 w-1 bg-ghost-button-active-bg rounded-b-full",
                    {"rounded-t-full": index.current === 0},
                )} />
                <div className={"p-2 bg-ghost-button-active-bg border border-border-default text-active-filled rounded-lg"}>
                    <TypographyIcon Icon={Icon} variant={"h2"} />
                </div>
                <div className={clsx(
                    "flex-1 w-1 bg-ghost-button-active-bg rounded-t-full",
                    {"rounded-b-full": index.current === index.total - 1},
                )} />
            </div>
            <div className={clsx(
                "flex-1 py-12 flex flex-col gap-2.5",
                "text-transparent bg-clip-text bg-(image:--gradient-text)",
            )}>
                <ReactMarkdown components={{
                    p: ({node, ...props}) => (
                        <p className={"text-primary"} {...props} />
                    ),
                    strong: ({node, ...props}) => (
                        <strong className={"text-transparent"} {...props} />
                    )
                }}>
                    {experience.descriptionPoints.join("\n\n")}
                </ReactMarkdown>
            </div>
        </article>
    )
}