import { ReactNode } from "react";
import {vi, describe, expect, it} from "vitest";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import Project from '@/lib/models/Project';
import Technology from '@/lib/models/Technology';
import projectFixtures from "@/lib/test-utils/fixtures/project.fixtures";

import ProjectsSection from '../ProjectsSection';
import ProjectAnimationWrapper from '../components/ProjectAnimationWrapper';
import ProjectsHeader from '../components/ProjectsHeader';
import ProjectList from "../components/ProjectList";
import {REFERENCES} from '../constants';

vi.mock('../components/ProjectAnimationWrapper', () => ({
    default: vi.fn().mockImplementation(({children}: {children: ReactNode}) => (
        <div data-testid="project-animation-wrapper">{children}</div>
    ))
}));

vi.mock('../components/ProjectsHeader', () => ({
    default: vi.fn().mockReturnValue(<div data-testid="projects-header" />)
}));

vi.mock('../components/ProjectList', () => ({
    default: vi.fn().mockReturnValue(<div data-testid="project-list" />)
}));

vi.mock('../constants', () => ({
    REFERENCES: {
        projectsHeaderId: 'projects-header-id'
    }
}));

describe('ProjectsSection', () => {
    const mockProject: Project = {
        ...projectFixtures[0],
        id: '1',
        title: 'Test Project',
        description: 'Test Description'
    } as Project;

    const mockTechnology: Technology = {
        id: '1',
        name: 'React'
    } as Technology;

    const mockProjects = [mockProject];
    const mockProjectsTechnologies = [[mockTechnology]];

    it('calls ProjectAnimationWrapper with correct props', () => {
        render(
            <ProjectsSection projects={mockProjects} projectsTechnologies={mockProjectsTechnologies} />
        );

        expect(ProjectAnimationWrapper).toHaveBeenCalledWith(
            expect.objectContaining({
                references: REFERENCES,
                projects: mockProjects
            }),
            undefined
        );
    });

    it('calls ProjectList with correct props', () => {
        render(
            <ProjectsSection projects={mockProjects} projectsTechnologies={mockProjectsTechnologies} />
        );

        expect(ProjectList).toHaveBeenCalledWith(
            expect.objectContaining({
                references: REFERENCES,
                projects: mockProjects,
                projectsTechnologies: mockProjectsTechnologies
            }),
            undefined
        );
    });

    it('calls ProjectsHeader with correct id', () => {
        render(
            <ProjectsSection projects={mockProjects} projectsTechnologies={mockProjectsTechnologies} />
        );

        expect(ProjectsHeader).toHaveBeenCalledWith(
            expect.objectContaining({
                id: REFERENCES.projectsHeaderId
            }),
            undefined
        );
    });
});