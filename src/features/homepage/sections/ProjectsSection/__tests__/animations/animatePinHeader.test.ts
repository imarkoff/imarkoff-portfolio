import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animatePinHeader from '../../animations/animatePinHeader';
import { SPACE_BETWEEN_HEADER_AND_PROJECTS } from '@/features/homepage/sections/ProjectsSection/constants';

vi.mock('gsap', async (importOriginal) => {
    const actual = await importOriginal<typeof import('gsap')>();
    return {
        ...actual,
        gsap: {
            registerPlugin: vi.fn(),
        },
    };
});

vi.mock('gsap/ScrollTrigger', async (importOriginal) => {
    const actual = await importOriginal<typeof import('gsap/ScrollTrigger')>();
    return {
        ...actual,
        ScrollTrigger: {
            create: vi.fn(),
        },
    };
});

describe('animatePinHeader', () => {
    const mockHeader = document.createElement('header');
    const mockCardsList = { offsetHeight: 2000 } as HTMLElement;
    const mockLastCard = { clientHeight: 500 } as Element;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates a ScrollTrigger with correct parameters', () => {
        animatePinHeader(mockHeader, mockCardsList, mockLastCard);

        const expectedPinEndOffset = mockCardsList.offsetHeight + SPACE_BETWEEN_HEADER_AND_PROJECTS - mockLastCard.clientHeight;

        expect(ScrollTrigger.create).toHaveBeenCalledWith({
            trigger: mockHeader,
            start: `bottom 25%-=${SPACE_BETWEEN_HEADER_AND_PROJECTS}px`,
            end: `bottom+=${expectedPinEndOffset} 25%`,
            scrub: true,
            pin: true,
            id: 'projects-header-pin',
            pinSpacing: false,
        });
    });

    it('calculates end trigger correctly when last card is taller than the list', () => {
        const tallLastCard = { clientHeight: 3000 } as Element;
        animatePinHeader(mockHeader, mockCardsList, tallLastCard);

        const expectedPinEndOffset = mockCardsList.offsetHeight + SPACE_BETWEEN_HEADER_AND_PROJECTS - tallLastCard.clientHeight;

        expect(ScrollTrigger.create).toHaveBeenCalledWith(
            expect.objectContaining({
                end: `bottom+=${expectedPinEndOffset} 25%`,
            })
        );
    });

    it('calculates end trigger correctly with zero height elements', () => {
        const zeroHeightCardsList = { offsetHeight: 0 } as HTMLElement;
        const zeroHeightLastCard = { clientHeight: 0 } as Element;
        animatePinHeader(mockHeader, zeroHeightCardsList, zeroHeightLastCard);

        const expectedPinEndOffset = zeroHeightCardsList.offsetHeight + SPACE_BETWEEN_HEADER_AND_PROJECTS - zeroHeightLastCard.clientHeight;

        expect(ScrollTrigger.create).toHaveBeenCalledWith(
            expect.objectContaining({
                end: `bottom+=${expectedPinEndOffset} 25%`,
            })
        );
    });
});