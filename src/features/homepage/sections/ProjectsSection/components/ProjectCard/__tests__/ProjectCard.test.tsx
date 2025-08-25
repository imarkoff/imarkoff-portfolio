import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
import technologyFixtures from '@/lib/test-utils/fixtures/technology.fixtures';
import ProjectCard from '../ProjectCard';
import ProjectCardWrapper from '../components/ProjectCardWrapper';
import ProjectCardContent from '../components/ProjectCardContent';
import ProjectCardImage from '../components/ProjectCardImage';
import {ProjectCardReference} from "../types";

vi.mock('../components/ProjectCardWrapper', () => ({
    default: vi.fn(({ children }) => <div>{children}</div>),
}));
vi.mock('../components/ProjectCardContent');
vi.mock('../components/ProjectCardImage');

const mockProjectCardWrapper = vi.mocked(ProjectCardWrapper);
const mockProjectCardContent = vi.mocked(ProjectCardContent);
const mockProjectCardImage = vi.mocked(ProjectCardImage);

describe('ProjectCard', () => {
    const mockProject = projectFixtures[0];
    const mockTechs = technologyFixtures[0].techs;
    const mockIndex = 0;
    const mockReferences: ProjectCardReference = {
        className: 'card-class',
        content: {
            className: 'content-class',
            techLabelClassName: 'label-class',
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders sub-components and passes props correctly when all props are provided', () => {
        render(
            <ProjectCard
                project={mockProject}
                techs={mockTechs}
                index={mockIndex}
                references={mockReferences}
            />
        );

        expect(mockProjectCardWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                project: mockProject,
                references: mockReferences,
                index: mockIndex,
            }),
            undefined
        );

        expect(mockProjectCardContent).toHaveBeenCalledWith(
            expect.objectContaining({
                project: mockProject,
                references: mockReferences.content,
                techs: mockTechs,
                index: mockIndex,
            }),
            undefined
        );

        expect(mockProjectCardImage).toHaveBeenCalledWith(
            { heroImage: mockProject.heroImage },
            undefined
        );
    });

    it('handles undefined references gracefully by passing undefined to children', () => {
        render(
            <ProjectCard
                project={mockProject}
                techs={mockTechs}
                index={mockIndex}
                references={undefined}
            />
        );

        expect(mockProjectCardWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                references: undefined,
            }),
            undefined
        );

        expect(mockProjectCardContent).toHaveBeenCalledWith(
            expect.objectContaining({
                references: undefined,
            }),
            undefined
        );
    });
});