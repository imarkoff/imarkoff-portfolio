import {render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import "@testing-library/jest-dom/vitest";
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
import technologyFixtures from '@/lib/test-utils/fixtures/technology.fixtures';
import ProjectList from '../../components/ProjectList';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import {mockReferences} from "../mocks";

vi.mock('../../components/ProjectCard/ProjectCard', () => ({
    default: vi.fn(() => <div>Mocked ProjectCard</div>),
}));

const mockProjectCard = vi.mocked(ProjectCard);

describe('ProjectList', () => {
    const mockProjects = projectFixtures.slice(0, 2);
    const mockProjectsTechnologies = technologyFixtures
        .slice(0, 2)
        .map((techsByCategory) => techsByCategory.techs);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the correct number of ProjectCard components', () => {
        render(<ProjectList
            references={mockReferences}
            projects={mockProjects}
            projectsTechnologies={mockProjectsTechnologies}
        />);
        expect(mockProjectCard).toHaveBeenCalledTimes(mockProjects.length);
    });

    it('passes the correct props to each ProjectCard', () => {
        render(<ProjectList
            references={mockReferences}
            projects={mockProjects}
            projectsTechnologies={mockProjectsTechnologies}
        />);

        expect(mockProjectCard).toHaveBeenCalledWith(
            expect.objectContaining({
                project: mockProjects[0],
                references: mockReferences.projectCard,
                techs: mockProjectsTechnologies[0],
                index: 0,
            }),
            undefined
        );

        expect(mockProjectCard).toHaveBeenCalledWith(
            expect.objectContaining({
                project: mockProjects[1],
                references: mockReferences.projectCard,
                techs: mockProjectsTechnologies[1],
                index: 1,
            }),
            undefined
        );
    });

    it('renders an empty container when no projects are provided', () => {
        const { container } = render(<ProjectList
            references={mockReferences}
            projects={[]}
            projectsTechnologies={[]}
        />);

        const listContainer = container.querySelector(`#${mockReferences.projectsListId}`);
        expect(listContainer).toBeInTheDocument();
        expect(listContainer?.childElementCount).toBe(0);
        expect(mockProjectCard).not.toHaveBeenCalled();
    });

    it('applies the provided id to the main container', () => {
        render(<ProjectList
            references={mockReferences}
            projects={mockProjects}
            projectsTechnologies={mockProjectsTechnologies}
        />);
        const listContainer = screen.getByTestId('projects-list');

        expect(listContainer).toHaveAttribute('id', mockReferences.projectsListId);
    });
});