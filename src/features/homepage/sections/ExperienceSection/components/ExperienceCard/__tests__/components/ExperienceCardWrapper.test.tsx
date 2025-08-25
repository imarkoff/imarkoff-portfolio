import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import ExperienceCardWrapper from '../../components/ExperienceCardWrapper';
import useAnimateExperienceCard from '../../hooks/useAnimateExperienceCard';
import {mockReferences} from "../mocks";

vi.mock('../../hooks/useAnimateExperienceCard', () => ({
    default: vi.fn(),
}));

describe('ExperienceCardWrapper', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders children correctly', () => {
        render(
            <ExperienceCardWrapper isPresent={true} references={mockReferences}>
                <div data-testid="child">Child content</div>
            </ExperienceCardWrapper>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('applies correct class to the root element', () => {
        const { container } = render(
            <ExperienceCardWrapper isPresent={true} references={mockReferences}>
                <div>Child content</div>
            </ExperienceCardWrapper>
        );

        const rootElement = container.querySelector('article');
        expect(rootElement).toHaveClass('flex gap-6 lg:gap-12 items-center');
    });

    it('calls useAnimateExperienceCard with correct arguments when present', () => {
        const { getByTestId } = render(
            <ExperienceCardWrapper isPresent={true} references={mockReferences}>
                <div>Child content</div>
            </ExperienceCardWrapper>
        );
        const rootElement = getByTestId('experience-card-wrapper');

        expect(useAnimateExperienceCard).toHaveBeenCalledWith(
            expect.objectContaining({ current: rootElement }),
            true,
            mockReferences
        );
    });

    it('calls useAnimateExperienceCard with isPresent=false when not present', () => {
        const { getByTestId } = render(
            <ExperienceCardWrapper isPresent={false} references={mockReferences}>
                <div>Child content</div>
            </ExperienceCardWrapper>
        );
        const rootElement = getByTestId('experience-card-wrapper');

        expect(useAnimateExperienceCard).toHaveBeenCalledWith(
            expect.objectContaining({ current: rootElement }),
            false,
            mockReferences
        );
    });
});