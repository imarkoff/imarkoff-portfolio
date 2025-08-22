import { describe, it, expect, vi, beforeEach } from 'vitest';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import staggerIntro from '../../animations/staggerIntro';

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

describe('staggerIntro', () => {
    let introElement: HTMLDivElement;

    beforeEach(() => {
        vi.clearAllMocks();
        introElement = document.createElement('div');
        introElement.appendChild(document.createElement('p'));
        introElement.appendChild(document.createElement('h1'));
    });

    it('creates a GSAP timeline', () => {
        staggerIntro(introElement);

        expect(gsap.timeline).toHaveBeenCalledWith({});
    });

    it('creates a ScrollTrigger with the correct configuration', () => {
        staggerIntro(introElement);

        expect(ScrollTrigger.create).toHaveBeenCalledWith({
            trigger: introElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            animation: mockTimeline
        });
    });

    it('adds a staggered "from" animation for the children of the intro element', () => {
        staggerIntro(introElement);

        expect(mockTimeline.from).toHaveBeenCalledWith(introElement.children, {
            duration: 0.25,
            opacity: 0.25,
            y: 50,
            stagger: 0.1,
        });
    });

    it('returns the created timeline instance', () => {
        const tl = staggerIntro(introElement);
        
        expect(tl).toBe(mockTimeline);
    });

    it('handles an element with no children without error', () => {
        const emptyIntroElement = document.createElement('div');

        staggerIntro(emptyIntroElement);

        expect(mockTimeline.from).toHaveBeenCalledWith(emptyIntroElement.children, expect.any(Object));
    });
});