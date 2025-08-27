import { render } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import ExperienceSection from '../ExperienceSection';
import ExperienceType, {ExperienceByType} from '@/lib/models/types/ExperienceType';
import ExperienceByTypeList, {ExperienceByTypeListProps} from "../components/ExperienceByTypeList";
import ExperienceItem from "@/lib/models/ExperienceItem";
import {groupedExperienceFixtures} from "@/lib/test-utils/fixtures/experience.fixtures";
import Section from "@/components/ui/Section";

vi.mock('@/components/ui/Section', () => ({
    default: vi.fn(({children}) => children),
}));

vi.mock('../components/ExperienceByTypeList', () => ({
    default: vi.fn(),
}));

const MockSection = vi.mocked(Section);
const MockExperienceByTypeList = vi.mocked(ExperienceByTypeList);

describe('ExperienceSection', () => {
    const mockExperience: ExperienceByType = {
        [ExperienceType.Work]: groupedExperienceFixtures[ExperienceType.Work],
        [ExperienceType.Education]: groupedExperienceFixtures[ExperienceType.Education],
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders an ExperienceByTypeList for each experience type', () => {
        render(<ExperienceSection experience={mockExperience} />);

        expect(MockExperienceByTypeList).toHaveBeenCalledTimes(2);
        expect(MockExperienceByTypeList).toHaveBeenCalledWith(
            expect.objectContaining<ExperienceByTypeListProps>({
                type: ExperienceType.Work,
                items: mockExperience[ExperienceType.Work] as ExperienceItem[],
            }),
            undefined
        );
        expect(MockExperienceByTypeList).toHaveBeenCalledWith(
            expect.objectContaining<ExperienceByTypeListProps>({
                type: ExperienceType.Education,
                items: mockExperience[ExperienceType.Education] as ExperienceItem[],
            }),
            undefined
        );
    });

    it('renders an empty section when experience object is empty', () => {
        render(<ExperienceSection experience={{}} />);

        expect(MockSection).toHaveBeenCalledOnce();
        expect(MockExperienceByTypeList).not.toHaveBeenCalled();
    });

    it('handles experience types with empty arrays', () => {
        const experienceWithEmpty: ExperienceByType = {
            [ExperienceType.Work]: [] as ExperienceItem[],
        };

        render(<ExperienceSection experience={experienceWithEmpty} />);

        expect(MockExperienceByTypeList).toHaveBeenCalledOnce();
        expect(MockExperienceByTypeList).toHaveBeenCalledWith(
            expect.objectContaining({
                type: ExperienceType.Work,
                items: [],
            }),
            undefined
        );
    });
});