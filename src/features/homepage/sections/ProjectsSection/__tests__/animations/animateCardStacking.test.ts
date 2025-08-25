import {vi, describe, it, expect, beforeEach, Mock} from 'vitest';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animateCardStacking from '../../animations/animateCardStacking';

vi.mock('gsap', async (importOriginal) => {
    const actual = await importOriginal<typeof import('gsap')>();
    return {
        ...actual,
        gsap: {
            registerPlugin: vi.fn(),
            fromTo: vi.fn(),
        },
    };
});

vi.mock('gsap/ScrollTrigger', async (importOriginal) => {
    const actual = await importOriginal<typeof import('gsap/ScrollTrigger')>();
    return {
        ...actual,
        ScrollTrigger: {
            create: vi.fn(),
            refresh: vi.fn(),
        },
    };
});

describe('animateCardStacking', () => {
    const mockCard = { clientHeight: 200 } as Element;
    const mockLastCard = { clientHeight: 300 } as Element;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates a GSAP animation with correct parameters', () => {
        const index = 0;
        const indexFromEnd = 2;
        const expectedY = -(mockLastCard.clientHeight - mockCard.clientHeight) - indexFromEnd * 25; // 25 is SPACE_BETWEEN_STACKED_CARDS

        animateCardStacking(mockCard, index, indexFromEnd, mockLastCard);

        expect(gsap.fromTo).toHaveBeenCalledWith(
            mockCard,
            { filter: 'brightness(1)' },
            {
                y: expectedY,
                filter: `brightness(${1 - indexFromEnd * 0.2})`,
                scale: 1 - indexFromEnd * 0.05,
            }
        );
    });

    it('creates a ScrollTrigger with correct parameters', () => {
        const index = 1;
        const mockAnimation = { test: 'animation' };
        (gsap.fromTo as Mock).mockReturnValue(mockAnimation);

        animateCardStacking(mockCard, index, 1, mockLastCard);

        expect(ScrollTrigger.create).toHaveBeenCalledWith({
            trigger: mockCard,
            start: 'bottom center',
            end: 'bottom top',
            id: `project-card-${index}`,
            scrub: true,
            animation: mockAnimation,
        });
    });

    it('calculates animation values correctly for the last card', () => {
        const index = 2;
        const indexFromEnd = 0;
        const expectedY = -(mockLastCard.clientHeight - mockCard.clientHeight);

        animateCardStacking(mockCard, index, indexFromEnd, mockLastCard);

        expect(gsap.fromTo).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.objectContaining({
                y: expectedY,
                filter: 'brightness(1)',
                scale: 1,
            })
        );
    });

    it('calculates brightness correctly, with a minimum of 0.5', () => {
        const index = 0;
        const indexFromEnd = 4; // This would result in 1 - 4 * 0.2 = 0.2, so it should be capped at 0.5

        animateCardStacking(mockCard, index, indexFromEnd, mockLastCard);

        expect(gsap.fromTo).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.objectContaining({
                filter: 'brightness(0.5)',
            })
        );
    });

    it('calculates animation values correctly when card is taller than the last card', () => {
        const tallerCard = { clientHeight: 400 } as Element;
        const index = 0;
        const indexFromEnd = 2;
        const expectedY = -(mockLastCard.clientHeight - tallerCard.clientHeight) - indexFromEnd * 25;

        animateCardStacking(tallerCard, index, indexFromEnd, mockLastCard);

        expect(gsap.fromTo).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.objectContaining({
                y: expectedY,
            })
        );
    });

    it('returns the created GSAP animation object', () => {
        const mockAnimation = { test: 'animation' };
        (gsap.fromTo as Mock).mockReturnValue(mockAnimation);

        const result = animateCardStacking(mockCard, 0, 2, mockLastCard);

        expect(result).toBe(mockAnimation);
    });
});