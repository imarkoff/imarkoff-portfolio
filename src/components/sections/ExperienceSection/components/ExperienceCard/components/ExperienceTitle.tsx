import dayjs from "dayjs";
import ExperienceItem from "@/lib/models/ExperienceItem";
import Typography from "@/components/ui/Typography";
import TypographyIcon from "@/components/ui/TypographyIcon";
import CommitIcon from "@/components/icons/CommitIcon";
import ExperienceType from "@/lib/models/types/ExperienceType";

interface ExperienceTitleProps {
    experience: ExperienceItem;
}

export default function ExperienceTitle(
    {experience}: ExperienceTitleProps
) {
    const experienceWork = experience.type === ExperienceType.Work ? experience : null;
    const experienceEducation = experience.type === ExperienceType.Education ? experience : null;

    const title = experienceWork?.position || experienceEducation?.degree || "Experience";
    const company = experienceWork?.organization || experienceEducation?.institution || "Unknown";

    const startDate = dayjs(experience.startDate).format("MMM YYYY");
    const endDate = experience.endDate ? dayjs(experience.endDate).format("MMM YYYY") : "Present";

    return (
        <div className={"flex flex-col"}>
            <Typography component={"h3"} variant={"h2"}>
                {title}
            </Typography>
            <Typography component={"h4"} variant={"h3"} className={"text-secondary"}>
                at {company}
            </Typography>
            <Typography className={"flex gap-1.5 items-center"}>
                <TypographyIcon Icon={CommitIcon} variant={"body"} />
                <span>
                    {startDate} - {endDate}
                </span>
            </Typography>
        </div>
    );
}