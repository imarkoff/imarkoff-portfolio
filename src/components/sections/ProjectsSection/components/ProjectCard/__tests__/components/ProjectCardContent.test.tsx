import {ReactNode} from "react";
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import "@testing-library/jest-dom/vitest";
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
import technologyFixtures from '@/lib/test-utils/fixtures/technology.fixtures';
import TechnologyLabel from "@/components/common/TechnologyLabel";
import ProjectCardContent from '../../components/ProjectCardContent';
import ProjectCardLinks from '../../components/ProjectCardLinks';
import ProjectCardHeader from '../../components/ProjectCardHeader';
import { ProjectCardContentReference } from '../../types';

vi.mock('@/components/ui/Typography', () => ({
    Typography: ({ children }: { children: ReactNode }) => <p>{children}</p>,
}));

vi.mock('@/components/common/TechnologyLabel', () => ({
    default: vi.fn(({ className, technology }) => (
        <div data-testid="tech-label" className={className}>
            {technology.name}
        </div>
    )),
}));

vi.mock('../../components/ProjectCardLinks', () => ({
    default: vi.fn(() => <div data-testid="project-card-links" />),
}));

vi.mock('../../components/ProjectCardHeader', () => ({
    default: vi.fn(() => <div data-testid="project-card-header" />),
}));

const mockTechnologyLabel = vi.mocked(TechnologyLabel);
const mockProjectCardLinks = vi.mocked(ProjectCardLinks);
const mockProjectCardHeader = vi.mocked(ProjectCardHeader);

describe('ProjectCardContent', () => {
    const mockProject = projectFixtures[0];
    const mockTechs = technologyFixtures[0].techs;
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
                techs={mockTechs}
                index={mockIndex}
                references={mockReferences}
            />
        );

        expect(mockProjectCardHeader)
            .toHaveBeenCalledWith({ project: mockProject, index: mockIndex }, undefined);
        expect(screen.getByText(mockProject.shortDescription))
            .toBeInTheDocument();
        expect(mockProjectCardLinks)
            .toHaveBeenCalledWith({ project: mockProject }, undefined);
        expect(mockTechnologyLabel)
            .toHaveBeenCalledTimes(mockTechs.length);
    });

    it('passes the correct props to each TechnologyLabel', () => {
        render(
            <ProjectCardContent
                project={mockProject}
                techs={mockTechs}
                index={mockIndex}
                references={mockReferences}
            />
        );

        mockTechs.forEach((tech, i) => {
            expect(mockTechnologyLabel).toHaveBeenNthCalledWith(
                i + 1,
                {
                    technology: tech,
                    className: mockReferences.techLabelClassName,
                },
                undefined
            );
        });
    });

    it('applies the custom class name from references to the main container', () => {
        const { container } = render(
            <ProjectCardContent
                project={mockProject}
                techs={mockTechs}
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
                techs={mockTechs}
                index={mockIndex}
                references={undefined}
            />
        );

        expect(container.firstChild)
            .not.toHaveClass('custom-content-class');
        expect(mockTechnologyLabel)
            .toHaveBeenCalledWith(
                expect.objectContaining({ className: undefined }),
                undefined
            );
    });

    it('renders no TechnologyLabel components when techs array is empty', () => {
        render(
            <ProjectCardContent
                project={mockProject}
                techs={[]}
                index={mockIndex}
                references={mockReferences}
            />
        );

        expect(screen.queryByTestId('tech-label')).not.toBeInTheDocument();
        expect(mockTechnologyLabel).not.toHaveBeenCalled();
    });
});