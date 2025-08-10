import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
import routeConfig from '@/config/routeConfig';
import LinkButton from '@/components/ui/Button/LinkButton';
import ArrowForwardIcon from '@/components/icons/ArrowForwardIcon';
import GitHubIcon from '@/components/icons/GitHubIcon';
import CodeIcon from '@/components/icons/CodeIcon';
import ProjectCardLinks from '../../components/ProjectCardLinks';

vi.mock('@/components/ui/Button/LinkButton', () => ({
    default: vi.fn(() => null),
}));

vi.mock('@/config/routeConfig', () => ({
    default: {
        projects: {
            children: {
                projectBySlug: {
                    path: (slug: string) => `/projects/${slug}`,
                },
            },
        },
    },
}));

const mockLinkButton = vi.mocked(LinkButton);

describe('ProjectCardLinks', () => {
    const projectWithSource = { ...projectFixtures[0], sourceCodeUrl: 'https://github.com/user/repo' };
    const projectWithoutSource = { ...projectFixtures[1], sourceCodeUrl: null };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders case study and source code links when source code url is provided', () => {
        render(<ProjectCardLinks project={projectWithSource} />);

        expect(mockLinkButton).toHaveBeenCalledTimes(2);
    });

    it('renders only the case study link when source code url is not provided', () => {
        render(<ProjectCardLinks project={projectWithoutSource} />);

        expect(mockLinkButton).toHaveBeenCalledOnce();
        expect(mockLinkButton).toHaveBeenCalledWith(
            expect.objectContaining({ children: 'View Case Study' }),
            undefined
        );
    });

    it('passes correct props to the case study link button', () => {
        render(<ProjectCardLinks project={projectWithSource} />);
        const expectedHref = routeConfig.projects.children.projectBySlug.path(projectWithSource.slug);

        expect(mockLinkButton).toHaveBeenCalledWith(
            expect.objectContaining({
                href: expect.any(Function),
                variant: 'primary',
                RightIcon: ArrowForwardIcon,
                children: 'View Case Study',
            }),
            undefined
        );

        const hrefFunction = mockLinkButton.mock.calls[0][0].href as Function;
        expect(hrefFunction(routeConfig)).toBe(expectedHref);
    });

    it('passes correct props to the source code link button', () => {
        render(<ProjectCardLinks project={projectWithSource} />);

        expect(mockLinkButton).toHaveBeenCalledWith(
            expect.objectContaining({
                href: projectWithSource.sourceCodeUrl,
                target: '_blank',
                title: 'View Source Code',
                variant: 'tertiary',
                isIconButton: true,
            }),
            undefined
        );
    });

    it('uses GitHubIcon for github.com source code links', () => {
        const githubProject = { ...projectWithSource, sourceCodeUrl: 'https://github.com/user/repo' };

        render(<ProjectCardLinks project={githubProject} />);

        expect(mockLinkButton).toHaveBeenCalledWith(
            expect.objectContaining({
                LeftIcon: GitHubIcon,
            }),
            undefined
        );
    });

    it('uses CodeIcon for non-github.com source code links', () => {
        const nonGithubProject = { ...projectWithSource, sourceCodeUrl: 'https://gitlab.com/user/repo' };

        render(<ProjectCardLinks project={nonGithubProject} />);

        expect(mockLinkButton).toHaveBeenCalledWith(
            expect.objectContaining({
                LeftIcon: CodeIcon,
            }),
            undefined
        );
    });
});