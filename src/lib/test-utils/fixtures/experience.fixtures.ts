import ExperienceType from "@/lib/models/types/ExperienceType";
import ExperienceItem from "@/lib/models/ExperienceItem";

export const experienceFixtures: ExperienceItem[] = [
    {
        id: '1',
        position: 'Job 1',
        organization: 'Organization 1',
        descriptionPoints: [],
        location: "Remote",
        type: ExperienceType.Work,
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString()
    },
    {
        id: '2',
        position: 'Job 2',
        organization: 'Organization 2',
        descriptionPoints: [],
        location: "Remote",
        type: ExperienceType.Work,
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString()
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
    ],
    education: [
        experienceFixtures[2]
    ]
};