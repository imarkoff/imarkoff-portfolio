import Section from "@/components/ui/Section";
import TypographyIcon from "@/components/ui/TypographyIcon";
import WorkIcon from "@/components/icons/WorkIcon";
import Typography from "@/components/ui/Typography";
import ExperienceType from "@/lib/models/types/ExperienceType";
import ExperienceItem from "@/lib/models/ExperienceItem";
import ExperienceCard from "@/components/sections/ExperienceSection/components/ExperienceCard";
import SchoolIcon from "@/components/icons/SchoolIcon";

interface ExperienceSectionProps {
    experience: Record<ExperienceType, ExperienceItem[]>;
}

export default function ExperienceSection(
    {experience}: ExperienceSectionProps
) {
    return (
        <Section slotProps={{
            section: { className: "flex flex-col gap-12" }
        }}>
            <div className={"flex gap-2.5 items-center lg:justify-center"}>
                <TypographyIcon Icon={WorkIcon} variant={"h1"}/>
                <Typography component={"h2"} variant={"h1"}>
                    Experience
                </Typography>
            </div>
            <div>
                {experience.work.map((item, index) => (
                    <ExperienceCard
                        experience={item}
                        index={{
                            current: index,
                            total: experience.work.length
                        }}
                        key={index}
                    />
                ))}
            </div>
            <div className={"flex gap-2.5 items-center lg:justify-center"}>
                <TypographyIcon Icon={SchoolIcon} variant={"h1"}/>
                <Typography component={"h2"} variant={"h1"}>
                    Education
                </Typography>
            </div>
            <div>
                {experience.education.map((item, index) => (
                    <ExperienceCard
                        experience={item}
                        index={{
                            current: index,
                            total: experience.work.length
                        }}
                        key={index}
                    />
                ))}
            </div>
        </Section>
    );
}