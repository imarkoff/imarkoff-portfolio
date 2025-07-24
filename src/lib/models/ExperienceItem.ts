import ExperienceType from "@/lib/models/types/ExperienceType";
import EducationGPA from "@/lib/models/types/EducationGPA";


interface ExperienceBase {
    id?: string;
    type: ExperienceType;
    location: string | null;
    startDate: string;
    endDate: string | null;
    descriptionPoints: string[];
}

export interface WorkExperience extends ExperienceBase {
    type: ExperienceType.Work;
    organization: string;
    position: string;
}

export interface EducationExperience extends ExperienceBase {
    type: ExperienceType.Education;
    institution: string;
    degree: string;
    gpa: EducationGPA | null;
}

type ExperienceItem = WorkExperience | EducationExperience;

export default ExperienceItem;