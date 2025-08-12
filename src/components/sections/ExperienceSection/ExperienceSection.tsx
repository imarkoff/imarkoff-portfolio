import Section from "@/components/ui/Section";
import ExperienceType from "@/lib/models/types/ExperienceType";
import ExperienceItem from "@/lib/models/ExperienceItem";
import ExperienceByTypeList from "@/components/sections/ExperienceSection/components/ExperienceByTypeList";

interface ExperienceSectionProps {
    experience: Record<ExperienceType, ExperienceItem[]>;
}

export default function ExperienceSection(
    {experience}: ExperienceSectionProps
) {
    return (
        <Section slotProps={{
            section: {className: "flex flex-col gap-12"}
        }}>
            {Object.entries(experience).map(([key, value]) => (
                <ExperienceByTypeList
                    type={key as ExperienceType}
                    items={value}
                    key={key}
                />
            ))}
        </Section>
    );
}