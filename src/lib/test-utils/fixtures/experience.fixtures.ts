import ExperienceType from "@/lib/models/types/ExperienceType";
import ExperienceItem, {EducationExperience, WorkExperience} from "@/lib/models/ExperienceItem";

export const experienceFixtures: ExperienceItem[] = [
    {
        id: '1',
        position: 'Job 1',
        organization: 'Organization 1',
        descriptionPoints: [],
        location: "Remote",
        type: ExperienceType.Work,
        startDate: '2020-01-01',
        endDate: '2021-01-01'
    },
    {
        id: '2',
        position: 'Job 2',
        organization: 'Organization 2',
        descriptionPoints: [],
        location: "Remote",
        type: ExperienceType.Work,
        startDate: '2021-02-01',
        endDate: null
    },
    {
        id: '3',
        institution: 'University 1',
        degree: 'Bachelor of Science',
        gpa: null,
        descriptionPoints: [],
        location: "Campus",
        type: ExperienceType.Education,
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString()
    }
];

export const groupedExperienceFixtures = {
    work: [
        experienceFixtures[0],
        experienceFixtures[1]
    ] as WorkExperience[],
    education: [
        experienceFixtures[2]
    ] as EducationExperience[]
};