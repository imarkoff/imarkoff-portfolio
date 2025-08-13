import dayjs from 'dayjs';
import { render } from '@testing-library/react';
import {vi, describe, beforeEach, expect, it} from "vitest";
import "@testing-library/jest-dom/vitest";
import ExperienceItem, {WorkExperience} from '@/lib/models/ExperienceItem';
import {experienceFixtures, groupedExperienceFixtures} from "@/lib/test-utils/fixtures/experience.fixtures";
import { REFERENCES } from '../constants';
import { ExperienceCardIndex } from '../types';
import ExperienceCard from '../ExperienceCard';
import ExperienceCardWrapper from '../components/ExperienceCardWrapper';
import ExperienceTitle from '../components/ExperienceTitle';
import ExperienceLine from '../components/ExperienceLine';
import ExperienceDescription from '../components/ExperienceDescription';

vi.mock('../components/ExperienceCardWrapper', () => ({
    default: vi.fn(({ children }) => children),
}));

vi.mock('../components/ExperienceTitle', () => ({
    default: vi.fn(),
}));

vi.mock('../components/ExperienceLine', () => ({
    default: vi.fn(),
}));

vi.mock('../components/ExperienceDescription', () => ({
    default: vi.fn(),
}));

const mockExperienceCardWrapper = vi.mocked(ExperienceCardWrapper);
const mockExperienceTitle = vi.mocked(ExperienceTitle);
const mockExperienceLine = vi.mocked(ExperienceLine);
const mockExperienceDescription = vi.mocked(ExperienceDescription);

describe('ExperienceCard', () => {
    const mockIndex: ExperienceCardIndex = { current: 0, total: 3 };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('marks experience as not present when endDate is in the past', () => {
        const pastExperience: WorkExperience = {
            ...groupedExperienceFixtures.work[0],
            endDate: '2020-01-01'
        };

        render(<ExperienceCard experience={pastExperience} index={mockIndex} />);

        expect(mockExperienceCardWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                isPresent: false,
                references: REFERENCES
            }),
            undefined
        );
    });

    it('marks experience as present when endDate is null', () => {
        const currentExperience = {
            ...groupedExperienceFixtures.work[1],
            endDate: null
        } as ExperienceItem;

        render(<ExperienceCard experience={currentExperience} index={mockIndex} />);

        expect(mockExperienceCardWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                isPresent: true,
                references: REFERENCES
            }),
            undefined
        );
    });

    it('marks experience as present when endDate is in the future', () => {
        const futureDate = dayjs().add(1, 'month').format('YYYY-MM-DD');
        const futureExperience: WorkExperience = {
            ...groupedExperienceFixtures.work[0],
            endDate: futureDate
        };

        render(<ExperienceCard experience={futureExperience} index={mockIndex} />);

        expect(mockExperienceCardWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                isPresent: true,
                references: REFERENCES
            }),
            undefined
        );
    })

    it('calls ExperienceTitle component twice with correct props', () => {
        const experience = experienceFixtures[0];

        render(<ExperienceCard experience={experience} index={mockIndex} />);

        expect(mockExperienceTitle).toHaveBeenCalledTimes(2);
        expect(mockExperienceTitle).toHaveBeenCalledWith(
            expect.objectContaining({ experience }),
            undefined
        );
    });

    it('calls ExperienceLine component with correct props', () => {
        const experience = experienceFixtures[0];

        render(<ExperienceCard experience={experience} index={mockIndex} />);

        expect(mockExperienceLine).toHaveBeenCalledWith(
            expect.objectContaining({
                references: REFERENCES.line,
                index: mockIndex
            }),
            undefined
        );
    });

    it('calls ExperienceDescription component with correct props', () => {
        const experience = experienceFixtures[0];

        render(<ExperienceCard experience={experience} index={mockIndex} />);

        expect(mockExperienceDescription).toHaveBeenCalledWith(
            expect.objectContaining({
                descriptionPoints: experience.descriptionPoints
            }),
            undefined
        );
    });

    it('left and right sides hide depending on screen size', () => {
        const experience = experienceFixtures[0];

        const { container, getByTestId } = render(<ExperienceCard experience={experience} index={mockIndex} />);
        const leftSide = container.querySelector(`.${REFERENCES.sides.leftSideClassName}`);
        const rightSide = container.querySelector(`.${REFERENCES.sides.rightSideClassName}`);

        expect(leftSide).toHaveClass("hidden");
        expect(leftSide).toHaveClass("lg:block");
        expect(rightSide).toBeInTheDocument();
        expect(getByTestId("experience-title-mobile")).toHaveClass("lg:hidden");
    })
});