import { describe, it, expect, vi, beforeEach } from 'vitest';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animateTrueFooter from '../../animations/animateTrueFooter';

const mockTimeline = {
    from: vi.fn(),
};

vi.mock('gsap', () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: vi.fn(() => mockTimeline),
    },
}));

vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {
        create: vi.fn(),
    },
}));

describe('animateTrueFooter', () => {
    let footerElement: HTMLDivElement;

    beforeEach(() => {
        vi.clearAllMocks();
        footerElement = document.createElement('div');
    });

    it('creates a GSAP timeline', () => {
        animateTrueFooter(footerElement);

        expect(gsap.timeline).toHaveBeenCalledWith({});
    });

    it('creates a ScrollTrigger with the correct configuration', () => {
        animateTrueFooter(footerElement);

        expect(ScrollTrigger.create).toHaveBeenCalledWith({
            trigger: footerElement,
            start: 'top bottom',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            animation: mockTimeline,
        });
    });

    it('adds a "from" animation to the timeline with correct properties', () => {
        animateTrueFooter(footerElement);

        expect(mockTimeline.from).toHaveBeenCalledWith(footerElement, {
            duration: 2,
            opacity: 0.25,
            yPercent: 100,
            ease: 'elastic.out(0.7, 0)',
        });
    });

    it('returns the created timeline instance', () => {
        const tl = animateTrueFooter(footerElement);

        expect(tl).toBe(mockTimeline);
    });
});