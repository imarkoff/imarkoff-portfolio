import {ExperienceCardReferences} from "@/features/homepage/sections/ExperienceSection/components/ExperienceCard/types";

export const PRESENT_COLOR = "var(--color-active-filled-hover)";

export const REFERENCES: ExperienceCardReferences = {
    sides: {
        leftSideClassName: 'experience-card-left',
        rightSideClassName: 'experience-card-right',
    },
    line: {
        filledLineClassName: 'experience-card-line-filled',
        pinClassName: 'experience-card-line-pin',
        pinChildClassName: 'experience-card-line-pin-child',
    }
};