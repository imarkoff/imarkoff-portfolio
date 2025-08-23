import ExperienceType from "@/lib/models/types/ExperienceType";
import {IconName} from "@/components/icons/utils/iconMap";

interface ExperienceMetadata {
    title: string;
    icon: IconName;
}

const experienceMetadata: Record<ExperienceType, ExperienceMetadata> = {
    [ExperienceType.Work]: {
        title: "Experience",
        icon: "work"
    },
    [ExperienceType.Education]: {
        title: "Education",
        icon: "school"
    }
}

export default experienceMetadata;