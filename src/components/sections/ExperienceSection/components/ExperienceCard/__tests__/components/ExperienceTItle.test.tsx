import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ExperienceType from '@/lib/models/types/ExperienceType';
import ExperienceItem, {EducationExperience, WorkExperience} from '@/lib/models/ExperienceItem';
import ExperienceTitle from '../../components/ExperienceTitle';
import {groupedExperienceFixtures} from "@/lib/test-utils/fixtures/experience.fixtures";

describe('ExperienceTitle', () => {
    it('renders work experience correctly', () => {
        const workExperience: WorkExperience = {
            ...groupedExperienceFixtures.work[0],
            type: ExperienceType.Work,
            position: 'Software Engineer',
            organization: 'Tech Company',
            startDate: '2020-01-01',
            endDate: '2022-06-30'
        };

        const {getByTestId} = render(<ExperienceTitle experience={workExperience} />);
        const typos = {
            position: getByTestId('experience-position'),
            company: getByTestId('experience-company'),
            dates: getByTestId('experience-dates')
        }

        expect(typos.position).toHaveTextContent('Software Engineer');
        expect(typos.company).toHaveTextContent('at Tech Company');
        expect(typos.dates).toHaveTextContent('Jan 2020 - Jun 2022');
    });

    it('renders education experience correctly', () => {
        const educationExperience: EducationExperience = {
            ...groupedExperienceFixtures.education[0],
            type: ExperienceType.Education,
            degree: 'Computer Science',
            institution: 'University',
            startDate: '2016-09-01',
            endDate: '2020-05-30'
        };

        const { getByText } = render(<ExperienceTitle experience={educationExperience} />);

        expect(getByText('Computer Science')).toBeInTheDocument();
        expect(getByText('at University')).toBeInTheDocument();
        expect(getByText('Sep 2016 - May 2020')).toBeInTheDocument();
    });

    it('displays "Present" when no end date is provided', () => {
        const currentExperience: ExperienceItem = {
            ...groupedExperienceFixtures.work[0],
            startDate: '2022-07-01',
            endDate: null
        };

        const { getByTestId } = render(<ExperienceTitle experience={currentExperience} />);
        const dates = getByTestId('experience-dates');

        expect(dates).toHaveTextContent('Jul 2022 - Present');
    });

    it('falls back to default values for missing fields', () => {
        const minimalExperience = {
            type: 'unknown' as any,
            startDate: '2022-01-01'
        } as ExperienceItem;

        const { getByText } = render(<ExperienceTitle experience={minimalExperience} />);

        expect(getByText('Experience')).toBeInTheDocument();
        expect(getByText('at Unknown')).toBeInTheDocument();
        expect(getByText('Jan 2022 - Present')).toBeInTheDocument();
    });

    it('has correct heading hierarchy', () => {
        const workExperience: WorkExperience = groupedExperienceFixtures.work[0];

        const { getByTestId } = render(<ExperienceTitle experience={workExperience} />);
        const typos = {
            position: getByTestId('experience-position'),
            company: getByTestId('experience-company'),
            dates: getByTestId('experience-dates')
        };

        expect(typos.position.tagName).toBe('H3');
        expect(typos.company.tagName).toBe('H4');
        expect(typos.dates.tagName).toBe('SPAN');
    });
});