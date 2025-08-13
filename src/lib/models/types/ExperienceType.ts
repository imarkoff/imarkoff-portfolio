import ExperienceItem from "@/lib/models/ExperienceItem";

enum ExperienceType {
    Work = "work",
    Education = "education"
}

export type ExperienceByType = Partial<Record<ExperienceType, ExperienceItem[]>>;

export default ExperienceType;