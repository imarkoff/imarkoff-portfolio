import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/vitest";
import HeroBackground from '@/components/sections/HeroSection/components/HeroBackground';
import gsap from 'gsap';

vi.mock('@gsap/react', () => ({
    useGSAP: vi.fn().mockImplementation((callback) => callback()),
}));

vi.mock('gsap', () => ({
    default: {
        fromTo: vi.fn(),
    },
}));

describe('HeroBackground', () => {
    const originalQuerySelectorAll = document.querySelectorAll;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        document.querySelectorAll = originalQuerySelectorAll;
    });

    it('renders four gradient divs', () => {
        const { container } = render(<HeroBackground />);
        const gradientDivs = container.querySelectorAll('.hero-gradient');

        expect(gradientDivs.length).toBe(4);
    });

    it('animates gradients when elements are found', () => {
        const mockElements = [document.createElement('div'), document.createElement('div')];
        document.querySelectorAll = vi.fn().mockReturnValue(mockElements);

        render(<HeroBackground />);

        expect(gsap.fromTo).toHaveBeenCalledWith(
            mockElements,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.75,
                ease: "power1.out",
                stagger: 1,
            }
        );
    });

    it('does not animate when no gradient elements are found', () => {
        document.querySelectorAll = vi.fn().mockReturnValue([]);

        render(<HeroBackground />);

        expect(gsap.fromTo).not.toHaveBeenCalled();
    });
});