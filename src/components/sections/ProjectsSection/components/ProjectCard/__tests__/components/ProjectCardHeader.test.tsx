import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import "@testing-library/jest-dom/vitest";
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
import Label from '@/components/ui/Label';
import Project from '@/lib/models/Project';
import ProjectCardHeader from '../../components/ProjectCardHeader';

vi.mock('@/lib/constants/projectTypeMetadata', () => ({
    default: {
        'web-app': {
            label: 'Web Application',
            color: 'blue',
        },
    },
}));

vi.mock('@/components/ui/Typography', () => ({
    default: ({ children, component: Component = 'div', ...props }: any) => (
        <Component {...props}>{children}</Component>
    ),
}));

vi.mock('@/components/ui/Label', () => ({
    default: vi.fn(({ children, ...props }) => <div {...props}>{children}</div>),
}));

const mockLabel = vi.mocked(Label);

describe('ProjectCardHeader', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders project name and index correctly', () => {
        const project: Project = { ...projectFixtures[0], type: null, githubStats: null };

        render(<ProjectCardHeader project={project} index={0} />);

        expect(screen.getByRole('heading', { name: project.name })).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders project type label with metadata when type exists', () => {
        const project: Project = { ...projectFixtures[0], type: "web-app" as Project['type'] };

        render(<ProjectCardHeader project={project} index={0} />);

        expect(screen.getByText('Web Application')).toBeInTheDocument();
        expect(mockLabel).toHaveBeenCalledWith(
            expect.objectContaining({ color: 'blue' }),
            undefined
        );
    });

    it('renders project type label with fallback when metadata is missing', () => {
        const project = { ...projectFixtures[0], type: 'unknown-type' as Project['type'] };

        render(<ProjectCardHeader project={project} index={0} />);

        expect(screen.getByText('unknown-type')).toBeInTheDocument();
        expect(mockLabel).toHaveBeenCalledWith(
            expect.objectContaining({ color: undefined }),
            undefined
        );
    });

    it('does not render project type label when type is not provided', () => {
        const project: Project = { ...projectFixtures[0], type: null };
        render(<ProjectCardHeader project={project} index={0} />);

        expect(screen.queryByText('Web Application')).not.toBeInTheDocument();
    });

    it('renders github stars label when stats are shown', () => {
        const project: Project = {
            ...projectFixtures[0],
            githubStats: { show: true, stars: 123 },
        };

        render(<ProjectCardHeader project={project} index={0} />);

        expect(screen.getByText('123+ ⭐ on GitHub')).toBeInTheDocument();
        expect(mockLabel).toHaveBeenCalledWith(
            expect.objectContaining({ color: 'yellow' }),
            undefined
        );
    });

    it('renders github stars label with zero when stars are not provided', () => {
        const project: Project = {
            ...projectFixtures[0],
            githubStats: { show: true },
        } as Project;

        render(<ProjectCardHeader project={project} index={0} />);

        expect(screen.getByText('0+ ⭐ on GitHub')).toBeInTheDocument();
    });

    it('does not render github stars label when show is false', () => {
        const project: Project = {
            ...projectFixtures[0],
            githubStats: { show: false, stars: 123 },
        };

        render(<ProjectCardHeader project={project} index={0} />);

        expect(screen.queryByText(/⭐ on GitHub/)).not.toBeInTheDocument();
    });

    it('does not render github stars label when stats are not provided', () => {
        const project: Project = { ...projectFixtures[0], githubStats: null };

        render(<ProjectCardHeader project={project} index={0} />);

        expect(screen.queryByText(/⭐ on GitHub/)).not.toBeInTheDocument();
    });
});