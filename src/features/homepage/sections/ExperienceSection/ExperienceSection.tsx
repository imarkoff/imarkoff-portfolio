import ExperienceType, {ExperienceByType} from "@/lib/models/types/ExperienceType";
import ExperienceByTypeList from "@/features/homepage/sections/ExperienceSection/components/ExperienceByTypeList";
import HomePageSection from "@/features/homepage/components/HomePageSection";

interface ExperienceSectionProps {
    experience: ExperienceByType;
}

export default function ExperienceSection(
    {experience}: ExperienceSectionProps
) {
    return (
        <HomePageSection
            id={"experience"}
            slotProps={{
                section: {className: "flex flex-col gap-12"}
            }}
        >
            {Object.entries(experience).map(([key, value]) => (
                <ExperienceByTypeList
                    type={key as ExperienceType}
                    items={value}
                    key={key}
                />
            ))}
        </HomePageSection>
    );
}