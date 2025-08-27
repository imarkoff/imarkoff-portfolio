import {ReactNode} from "react";
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import "@testing-library/jest-dom/vitest";
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
import ProjectCardContent from '../../components/ProjectCardContent';
import ProjectCardLinks from '../../components/ProjectCardLinks';
import ProjectCardHeader from '../../components/ProjectCardHeader';
import { ProjectCardContentReference } from '../../types';
import Project from "@/lib/models/Project";
import {SlugTechnologyLabel, SlugTechnologyLabelProps} from "@/components/ui/TechnologyLabel";

vi.mock('@/components/ui/Typography', () => ({
    Typography: ({ children }: { children: ReactNode }) => <p>{children}</p>,
}));

vi.mock('@/components/ui/TechnologyLabel', () => ({
    SlugTechnologyLabel: vi.fn(({ className, technologySlug }) => (
        <div data-testid="tech-label" className={className}>
            {technologySlug}
        </div>
    )),
}));

vi.mock('../../components/ProjectCardLinks', () => ({
    default: vi.fn(() => <div data-testid="project-card-links" />),
}));

vi.mock('../../components/ProjectCardHeader', () => ({
    default: vi.fn(() => <div data-testid="project-card-header" />),
}));

describe('ProjectCardContent', () => {
    const mockProject = projectFixtures[0];
    const mockIndex = 1;
    const mockReferences: ProjectCardContentReference = {
        className: 'custom-content-class',
        techLabelClassName: 'custom-tech-label-class',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all child components with correct props', () => {
        render(
            <ProjectCardContent
                project={mockProject}
                index={mockIndex}
                references={mockReferences}
            />
        );

        expect(ProjectCardHeader)
            .toHaveBeenCalledWith({ project: mockProject, index: mockIndex }, undefined);
        expect(screen.getByText(mockProject.shortDescription))
            .toBeInTheDocument();
        expect(ProjectCardLinks)
            .toHaveBeenCalledWith({ project: mockProject }, undefined);
    });

    it('passes the correct props to each SlugTechnologyLabel component', () => {
        render(
            <ProjectCardContent
                project={mockProject}
                index={mockIndex}
                references={mockReferences}
            />
        );

        mockProject.coreTechs.forEach((slug, i) => {
            expect(SlugTechnologyLabel).toHaveBeenNthCalledWith(
                i + 1,
                {
                    technologySlug: slug,
                    className: mockReferences.techLabelClassName,
                } as SlugTechnologyLabelProps,
                undefined
            );
        });
    });

    it('applies the custom class name from references to the main container', () => {
        const { container } = render(
            <ProjectCardContent
                project={mockProject}
                index={mockIndex}
                references={mockReferences}
            />
        );
        expect(container.firstChild).toHaveClass(mockReferences.className as string);
    });

    it('renders correctly without references', () => {
        const { container } = render(
            <ProjectCardContent
                project={mockProject}
                index={mockIndex}
                references={undefined}
            />
        );

        expect(container.firstChild)
            .not.toHaveClass('custom-content-class');
        expect(SlugTechnologyLabel)
            .toHaveBeenCalledWith(
                expect.objectContaining({ className: undefined }),
                undefined
            );
    });

    it('renders no SlugTechnologyLabel components when techs array is empty', () => {
        const mockProjectWithoutTechs: Project = {
            ...mockProject,
            coreTechs: [],
        };

        render(
            <ProjectCardContent
                project={mockProjectWithoutTechs}
                index={mockIndex}
                references={mockReferences}
            />
        );

        expect(screen.queryByTestId('tech-label')).not.toBeInTheDocument();
        expect(SlugTechnologyLabel).not.toHaveBeenCalled();
    });
});