import {vi, describe, it, expect, beforeEach} from 'vitest';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import animateRootGradient from '../../animations/animateRootGradient';
import Project from '@/lib/models/Project';
import { DEFAULT_HUE } from '@/components/sections/ProjectsSection/constants';

vi.mock('gsap', () => ({
    default: {
        to: vi.fn(),
    }
}));

let mockScrollTrigger: {
    callbacks: {
        onEnter?: () => void;
        onLeaveBack?: () => void;
    } | null;
} = {
    callbacks: null
};

vi.mock('gsap/ScrollTrigger', () => ({
    default: {
        create: vi.fn().mockImplementation(options => {
            mockScrollTrigger.callbacks = options;
        }),
    },
}));

describe('animateRootGradient', () => {
    const mockProject: Project = { name: 'Project 1', colors: { primaryHue: 100 } } as Project;
    const mockPrevProject: Project = { name: 'Project 0', colors: { primaryHue: 50 } } as Project;
    const mockProjectWithoutColor: Project = { name: 'Project 2' } as Project;
    const mockSectionRoot = document.createElement('section');
    const mockCard = document.createElement('div');
    const index = 1;

    beforeEach(() => {
        vi.clearAllMocks();
        mockScrollTrigger.callbacks = null;
    });

    it('creates a ScrollTrigger with correct parameters', () => {
        animateRootGradient(mockProject, mockPrevProject, mockSectionRoot, mockCard, index);

        expect(ScrollTrigger.create).toHaveBeenCalledWith(expect.objectContaining({
            trigger: mockCard,
            start: 'top center',
            end: 'center center',
            id: `project-card-${index}-root-gradient`,
        }));
    });

    it('animates to project hue onEnter', () => {
        animateRootGradient(mockProject, mockPrevProject, mockSectionRoot, mockCard, index);
        mockScrollTrigger.callbacks?.onEnter?.();

        expect(gsap.to).toHaveBeenCalledWith(mockSectionRoot, {
            '--gradient-hue': mockProject.colors?.primaryHue,
            duration: 0.3,
        });
    });

    it('animates to previous project hue onLeaveBack', () => {
        animateRootGradient(mockProject, mockPrevProject, mockSectionRoot, mockCard, index);
        mockScrollTrigger.callbacks?.onLeaveBack?.();

        expect(gsap.to).toHaveBeenCalledWith(mockSectionRoot, {
            '--gradient-hue': mockPrevProject.colors?.primaryHue,
            duration: 0.3,
        });
    });

    it('animates to default hue onLeaveBack when there is no previous project', () => {
        animateRootGradient(mockProject, null, mockSectionRoot, mockCard, index);
        mockScrollTrigger.callbacks?.onLeaveBack?.();

        expect(gsap.to).toHaveBeenCalledWith(mockSectionRoot, {
            '--gradient-hue': DEFAULT_HUE,
            duration: 0.3,
        });
    });

    it('animates to default hue onLeaveBack when previous project has no color', () => {
        animateRootGradient(mockProject, mockProjectWithoutColor, mockSectionRoot, mockCard, index);
        mockScrollTrigger.callbacks?.onLeaveBack?.();

        expect(gsap.to).toHaveBeenCalledWith(mockSectionRoot, {
            '--gradient-hue': DEFAULT_HUE,
            duration: 0.3,
        });
    });

    it('animates to undefined hue onEnter when project has no color', () => {
        animateRootGradient(mockProjectWithoutColor, mockPrevProject, mockSectionRoot, mockCard, index);
        mockScrollTrigger.callbacks?.onEnter?.();

        expect(gsap.to).toHaveBeenCalledWith(mockSectionRoot, {
            '--gradient-hue': undefined,
            duration: 0.3,
        });
    });
});