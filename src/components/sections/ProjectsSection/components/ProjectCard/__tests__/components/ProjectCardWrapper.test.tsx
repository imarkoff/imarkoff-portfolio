import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import "@testing-library/jest-dom/vitest";
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
import dottedBackground from '@/utils/dottedBackground';
import ProjectCardWrapper from '../../components/ProjectCardWrapper';
import useProjectCardStyles from '../../hooks/useProjectCardStyles';
import useCardContentAppear from '../../hooks/useCardContentAppear';
import { ProjectCardProps } from '../../types';
import {CSSProperties} from "react";

vi.mock('../../hooks/useProjectCardStyles');
vi.mock('../../hooks/useCardContentAppear', () => ({
    default: vi.fn(),
}));
vi.mock('@/utils/dottedBackground');

const mockUseProjectCardStyles = vi.mocked(useProjectCardStyles);
const mockUseCardContentAppear = vi.mocked(useCardContentAppear);
const mockDottedBackground = vi.mocked(dottedBackground);

describe('ProjectCardWrapper', () => {
    const mockProject = projectFixtures[0];
    const mockReferences: ProjectCardProps['references'] = {
        className: 'custom-class',
        content: {
            className: 'content-class',
            techLabelClassName: 'tech-label-class',
        },
    };
    const mockIndex = 1;
    const mockChildren = <div data-testid="child-content" />;

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseProjectCardStyles.mockReturnValue({ color: 'red' });
        mockDottedBackground.mockReturnValue({ background: 'dots' });
    });

    it('renders its children', () => {
        render(
            <ProjectCardWrapper project={mockProject} references={mockReferences} index={mockIndex}>
                {mockChildren}
            </ProjectCardWrapper>
        );

        expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    it('applies custom class name from references', () => {
        const { container } = render(
            <ProjectCardWrapper project={mockProject} references={mockReferences} index={mockIndex}>
                {mockChildren}
            </ProjectCardWrapper>
        );

        expect(container.firstChild).toHaveClass(mockReferences.className as string);
    });

    it('applies border class when project colors are not provided', () => {
        const projectWithoutColors = { ...mockProject, colors: null };

        const { container } = render(
            <ProjectCardWrapper project={projectWithoutColors} references={mockReferences} index={mockIndex}>
                {mockChildren}
            </ProjectCardWrapper>
        );

        expect(container.firstChild).toHaveClass('border-border-menu');
    });

    it('does not apply border class when project colors are provided', () => {
        const { container } = render(
            <ProjectCardWrapper project={mockProject} references={mockReferences} index={mockIndex}>
                {mockChildren}
            </ProjectCardWrapper>
        );

        expect(container.firstChild).not.toHaveClass('border-border-menu');
    });

    it('calls useProjectCardStyles with project colors and applies the returned style', () => {
        const mockStyle = { '--custom-color': 'blue' } as CSSProperties;
        mockUseProjectCardStyles.mockReturnValue(mockStyle);

        render(
            <ProjectCardWrapper project={mockProject} references={mockReferences} index={mockIndex}>
                {mockChildren}
            </ProjectCardWrapper>
        );

        expect(mockUseProjectCardStyles)
            .toHaveBeenCalledWith(mockProject.colors);
        expect(screen.getByRole('article'))
            .toHaveStyle(mockStyle as Record<string, unknown>);
    });

    it('calls useCardContentAppear with correct arguments', () => {
        render(
            <ProjectCardWrapper project={mockProject} references={mockReferences} index={mockIndex}>
                {mockChildren}
            </ProjectCardWrapper>
        );

        expect(mockUseCardContentAppear).toHaveBeenCalledWith(
            expect.any(Object),
            mockReferences.content,
            mockIndex
        );
    });

    it('calls dottedBackground utility and applies its style to the background div', () => {
        const mockBgStyle = { backgroundImage: 'url(dots.png)' };
        mockDottedBackground.mockReturnValue(mockBgStyle);

        const { container } = render(
            <ProjectCardWrapper project={mockProject} references={mockReferences} index={mockIndex}>
                {mockChildren}
            </ProjectCardWrapper>
        );
        const backgroundDiv = container.querySelector('.pointer-events-none');

        expect(mockDottedBackground).toHaveBeenCalledWith('rgba(255, 255, 255, 0.05)', '1px', '14px');
        expect(backgroundDiv).toHaveStyle(mockBgStyle);
    });

    it('handles undefined references gracefully', () => {
        const { container } = render(
            <ProjectCardWrapper project={mockProject} references={undefined} index={mockIndex}>
                {mockChildren}
            </ProjectCardWrapper>
        );

        expect(container.firstChild)
            .not.toHaveClass('custom-class');
        expect(mockUseCardContentAppear)
            .toHaveBeenCalledWith(expect.any(Object), undefined, mockIndex);
    });
});