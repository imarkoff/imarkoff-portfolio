import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
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

describe('ProjectCard', () => {
    const mockProject = projectFixtures[0];
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
                index={mockIndex}
                references={mockReferences}
            />
        );

        expect(ProjectCardWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                project: mockProject,
                references: mockReferences,
                index: mockIndex,
            }),
            undefined
        );

        expect(ProjectCardContent).toHaveBeenCalledWith(
            expect.objectContaining({
                project: mockProject,
                references: mockReferences.content,
                index: mockIndex,
            }),
            undefined
        );

        expect(ProjectCardImage).toHaveBeenCalledWith(
            { heroImage: mockProject.heroImage },
            undefined
        );
    });

    it('handles undefined references gracefully by passing undefined to children', () => {
        render(
            <ProjectCard
                project={mockProject}
                index={mockIndex}
                references={undefined}
            />
        );

        expect(ProjectCardWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                references: undefined,
            }),
            undefined
        );

        expect(ProjectCardContent).toHaveBeenCalledWith(
            expect.objectContaining({
                references: undefined,
            }),
            undefined
        );
    });
});