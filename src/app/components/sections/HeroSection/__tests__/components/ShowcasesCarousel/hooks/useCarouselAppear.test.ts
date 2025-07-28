import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import useCarouselAppear from '@/app/components/sections/HeroSection/components/ShowcaseCarousel/hooks/useCarouselAppear';
import { useRef } from 'react';
import gsap from 'gsap';

vi.mock('react', async () => {
    const actual = await vi.importActual('react');
    return {
        ...actual,
        useRef: vi.fn().mockImplementation(() => ({ current: null })),
    };
});

vi.mock('@gsap/react', () => ({
    useGSAP: vi.fn().mockImplementation((callback) => callback()),
}));

vi.mock('gsap', () => ({
    default: {
        fromTo: vi.fn(),
    },
}));

describe('useCarouselAppear', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns a ref', () => {
        const mockRef = { current: null };
        (useRef as Mock).mockReturnValue(mockRef);

        const { result } = renderHook(() => useCarouselAppear());

        expect(result.current).toBe(mockRef);
    });

    it('does not animate when ref is null', () => {
        const mockRef = { current: null };
        (useRef as Mock).mockReturnValue(mockRef);

        renderHook(() => useCarouselAppear());

        expect(gsap.fromTo).not.toHaveBeenCalled();
    });

    it('animates with correct parameters when ref is available', () => {
        const mockElement = document.createElement('div');
        const mockRef = { current: mockElement };
        (useRef as Mock).mockReturnValue(mockRef);

        renderHook(() => useCarouselAppear());

        expect(gsap.fromTo).toHaveBeenCalledWith(
            mockElement,
            {
                xPercent: 100,
                yPercent: 100,
                opacity: 0,
            },
            {
                xPercent: 0,
                yPercent: 0,
                opacity: 1,
                ease: "elastic.out(0.25)",
                duration: 3,
                delay: 1.5,
            }
        );
    });
});