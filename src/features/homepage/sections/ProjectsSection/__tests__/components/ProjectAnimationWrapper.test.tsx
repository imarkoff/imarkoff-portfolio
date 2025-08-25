import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import "@testing-library/jest-dom/vitest";
import projectFixtures from '@/lib/test-utils/fixtures/project.fixtures';
import Section from "@/components/ui/Section";
import { DEFAULT_HUE, SPACE_BETWEEN_HEADER_AND_PROJECTS } from '../../constants';
import ProjectAnimationWrapper from '../../components/ProjectAnimationWrapper';
import useAnimateProjectCards from '../../hooks/useAnimateProjectCards';
import {mockReferences} from "@/features/homepage/sections/ProjectsSection/__tests__/mocks";

vi.mock('../../hooks/useAnimateProjectCards', () => ({
    default: vi.fn(),
}));

const mockUseAnimateProjectCards = vi.mocked(useAnimateProjectCards);

vi.mock('@/components/ui/Section', () => ({
    default: vi.fn(({ slotProps, children }) => (
        <section ref={slotProps.root.ref} style={slotProps.root.style} data-testid="section-root">
            <div className={slotProps.section.className} style={slotProps.section.style}>
                {children}
            </div>
        </section>
    )),
}));

describe('ProjectAnimationWrapper', () => {
    const mockProjects = projectFixtures;
    const mockRootRef = { current: document.createElement('div') };

    beforeEach(() => {
        vi.clearAllMocks();
        mockUseAnimateProjectCards.mockReturnValue(mockRootRef);
    });

    it('renders its children', () => {
        render(
            <ProjectAnimationWrapper references={mockReferences} projects={mockProjects}>
                <div>Test Child</div>
            </ProjectAnimationWrapper>
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('calls useAnimateProjectCards hook with the provided references and projects', () => {
        render(
            <ProjectAnimationWrapper references={mockReferences} projects={mockProjects}>
                <div />
            </ProjectAnimationWrapper>
        );

        expect(mockUseAnimateProjectCards).toHaveBeenCalledWith(mockReferences, mockProjects);
    });

    it('passes the ref from the hook to the Section component', () => {
        render(
            <ProjectAnimationWrapper references={mockReferences} projects={mockProjects}>
                <div />
            </ProjectAnimationWrapper>
        );

        expect(Section).toHaveBeenCalledWith(
            expect.objectContaining({
                slotProps: expect.objectContaining({
                    root: expect.objectContaining({
                        ref: mockRootRef,
                    }),
                }),
            }),
            undefined
        );
    });

    it('applies correct initial styles and CSS variables to the Section root', () => {
        render(
            <ProjectAnimationWrapper references={mockReferences} projects={mockProjects}>
                <div />
            </ProjectAnimationWrapper>
        );
        const expectedStyle = {
            "--gradient-hue": DEFAULT_HUE,
            "--gradient-color": "hsla(var(--gradient-hue), 100%, 50%, 0.15)",
            background: "radial-gradient(45% 45% at 50% 7%, var(--gradient-color) 1%, #FF000000 99%),radial-gradient(45% 45% at -6% 74%, var(--gradient-color) 1%, #FF000000 99%)"
        };

        expect(Section).toHaveBeenCalledWith(
            expect.objectContaining({
                slotProps: expect.objectContaining({
                    root: expect.objectContaining({
                        style: expectedStyle,
                    }),
                }),
            }),
            undefined
        );
    });

    it('applies correct class and gap style to the inner section', () => {
        render(
            <ProjectAnimationWrapper references={mockReferences} projects={mockProjects}>
                <div />
            </ProjectAnimationWrapper>
        );

        expect(Section).toHaveBeenCalledWith(
            expect.objectContaining({
                slotProps: expect.objectContaining({
                    section: {
                        className: "flex flex-col items-center",
                        style: { gap: `${SPACE_BETWEEN_HEADER_AND_PROJECTS}px` }
                    },
                }),
            }),
            undefined
        );
    });
});