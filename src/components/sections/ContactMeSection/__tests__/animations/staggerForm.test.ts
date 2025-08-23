import { describe, it, expect, vi, beforeEach } from 'vitest';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import staggerForm from '../../animations/staggerForm';

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

describe('staggerForm', () => {
    let cardElement: HTMLDivElement;

    beforeEach(() => {
        vi.clearAllMocks();
        cardElement = document.createElement('div');
        cardElement.appendChild(document.createElement('span'));
        cardElement.appendChild(document.createElement('span'));
    });

    it('creates a GSAP timeline', () => {
        staggerForm(cardElement);

        expect(gsap.timeline).toHaveBeenCalledWith({});
    });

    it('creates a ScrollTrigger with the correct configuration', () => {
        staggerForm(cardElement);

        expect(ScrollTrigger.create).toHaveBeenCalledWith({
            trigger: cardElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            animation: mockTimeline
        });
    });

    it('adds a "from" animation for the card element itself', () => {
        staggerForm(cardElement);

        expect(mockTimeline.from).toHaveBeenCalledWith(cardElement, {
            duration: 0.25,
            opacity: 0,
            x: 100
        });
    });

    it('adds a staggered "from" animation for the children of the card element', () => {
        staggerForm(cardElement);

        expect(mockTimeline.from).toHaveBeenCalledWith(cardElement.children, {
            duration: 0.25,
            opacity: 0,
            y: 20,
            stagger: 0.1,
        }, "<");
    });

    it('returns the created timeline instance', () => {
        const tl = staggerForm(cardElement);

        expect(tl).toBe(mockTimeline);
    });

    it('handles an element with no children without error', () => {
        const emptyCardElement = document.createElement('div');

        staggerForm(emptyCardElement);

        expect(mockTimeline.from).toHaveBeenCalledWith(
            emptyCardElement.children,
            expect.any(Object),
            expect.any(String)
        );
    });
});