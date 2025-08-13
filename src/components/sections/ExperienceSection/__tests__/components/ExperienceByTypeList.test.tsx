import { render } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import ExperienceItem from '@/lib/models/ExperienceItem';
import ExperienceType from '@/lib/models/types/ExperienceType';
import {groupedExperienceFixtures} from "@/lib/test-utils/fixtures/experience.fixtures";
import iconMap, {IconName} from "@/components/icons/IconMap";
import Typography, {TypographyProps} from "@/components/ui/Typography";
import TypographyIcon, {TypographyIconProps} from '@/components/ui/TypographyIcon';
import ExperienceCard, {ExperienceCardProps} from "../../components/ExperienceCard/ExperienceCard";
import ExperienceByTypeList from '../../components/ExperienceByTypeList';

vi.mock('@/lib/constants/experienceMetadata', () => ({
    default: {
        [ExperienceType.Work]: { title: 'Work Experience', icon: 'briefcase' },
        [ExperienceType.Education]: { title: 'Education', icon: 'graduation' },
    }
}));

vi.mock('@/components/icons/IconMap', () => ({
    default: {
        briefcase: vi.fn(),
        graduation: vi.fn()
    },
}));

vi.mock('@/components/ui/Typography', () => ({
    default: vi.fn()
}));

vi.mock('@/components/ui/TypographyIcon', () => ({
    default: vi.fn()
}));

vi.mock('../../components/ExperienceCard/ExperienceCard', () => ({
    default: vi.fn()
}));

const MockTypography = vi.mocked(Typography);
const MockTypographyIcon = vi.mocked(TypographyIcon);
const MockExperienceCard = vi.mocked(ExperienceCard);

describe('ExperienceByTypeList', () => {
    const mockWorkItems: ExperienceItem[] = groupedExperienceFixtures.work;

    const mockEducationItems: ExperienceItem[] = [
        groupedExperienceFixtures.education[0]
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders work experience header with correct icon and title', () => {
        const BriefcaseIcon = iconMap['briefcase' as IconName];

        render(<ExperienceByTypeList type={ExperienceType.Work} items={mockWorkItems} />);

        expect(MockTypographyIcon).toHaveBeenCalledOnce();
        expect(MockTypographyIcon).toHaveBeenCalledWith(
            expect.objectContaining<TypographyIconProps>({
                Icon: BriefcaseIcon,
            }),
            undefined
        );
        expect(MockTypography).toHaveBeenCalledWith(
            expect.objectContaining<TypographyProps>({
                children: 'Work Experience'
            }),
            undefined
        );
    });

    it('renders education experience header with correct icon and title', () => {
        const GraduationIcon = iconMap['graduation' as IconName];

        render(<ExperienceByTypeList type={ExperienceType.Education} items={mockEducationItems} />);

        expect(MockTypographyIcon).toHaveBeenCalledOnce();
        expect(MockTypographyIcon).toHaveBeenCalledWith(
            expect.objectContaining<TypographyIconProps>({
                Icon: GraduationIcon
            }),
            undefined
        );
        expect(MockTypography).toHaveBeenCalledWith(
            expect.objectContaining<TypographyProps>({
                children: 'Education'
            }),
            undefined
        );
    });

    it('renders typography with correct component and variant', () => {
        render(<ExperienceByTypeList type={ExperienceType.Work} items={mockWorkItems} />);

        expect(MockTypography).toHaveBeenCalledOnce();
        expect(MockTypography).toHaveBeenCalledWith(
            expect.objectContaining<Partial<TypographyProps>>({
                component: 'h2',
                variant: 'h1'
            }),
            undefined
        );
        expect(MockTypographyIcon).toHaveBeenCalledWith(
            expect.objectContaining<Partial<TypographyIconProps>>({
                variant: 'h1',
            }),
            undefined
        );
    });

    it('passes correct index information to each experience card', () => {
        render(<ExperienceByTypeList type={ExperienceType.Work} items={mockWorkItems} />);

        expect(MockExperienceCard).toHaveBeenCalledTimes(mockWorkItems.length);
        expect(MockExperienceCard).toHaveBeenCalledWith(
            expect.objectContaining<ExperienceCardProps>({
                experience: mockWorkItems[0],
                index: { current: 0, total: mockWorkItems.length }
            }),
            undefined
        );
        expect(MockExperienceCard).toHaveBeenCalledWith(
            expect.objectContaining<ExperienceCardProps>({
                experience: mockWorkItems[1],
                index: { current: 1, total: mockWorkItems.length }
            }),
            undefined
        );
    });

    it('renders empty experience list when no items provided', () => {
        const BriefcaseIcon = iconMap['briefcase' as IconName];

        render(<ExperienceByTypeList type={ExperienceType.Work} items={[]} />);

        expect(MockTypographyIcon).toHaveBeenCalledWith(
            expect.objectContaining<TypographyIconProps>({
                Icon: BriefcaseIcon,
            }),
            undefined
        );
        expect(MockTypography).toHaveBeenCalledWith(
            expect.objectContaining<TypographyProps>({
                children: 'Work Experience'
            }),
            undefined
        );
        expect(MockExperienceCard).not.toHaveBeenCalled();
    });

    it('renders single experience item with correct index', () => {
        render(<ExperienceByTypeList type={ExperienceType.Education} items={mockEducationItems} />);

        expect(MockExperienceCard).toHaveBeenCalledOnce();
        expect(MockExperienceCard).toHaveBeenCalledWith(
            expect.objectContaining<ExperienceCardProps>({
                experience: mockEducationItems[0],
                index: { current: 0, total: mockEducationItems.length }
            }),
            undefined
        );
    });
});