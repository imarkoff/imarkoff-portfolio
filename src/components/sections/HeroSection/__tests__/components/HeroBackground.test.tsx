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

    it('contains divs with correct gradient styles', () => {
        const { container } = render(<HeroBackground />);
        const gradientDivs = container.querySelectorAll('.hero-gradient');

        expect(gradientDivs[0]).toHaveAttribute(
            'style',
            expect.stringContaining('radial-gradient(40% 70% at 55% 72%, #4903FF15 0%, #073AFF00 100%)')
        );
        expect(gradientDivs[0]).toHaveAttribute(
            'style',
            expect.stringContaining('box-shadow: 0px 12px 100px 0px rgba(67, 7, 38, 0.25)')
        );

        expect(gradientDivs[1]).toHaveAttribute(
            'style',
            expect.stringContaining('radial-gradient(113% 91% at 16% 45%, #EE00FF0A 1%, #FF000000 99%)')
        );

        expect(gradientDivs[2]).toHaveAttribute(
            'style',
            expect.stringContaining('radial-gradient(50% 91% at -3% 48%, #CF00FF2A 1%, #FF000000 99%)')
        );

        expect(gradientDivs[3]).toHaveAttribute(
            'style',
            expect.stringContaining('radial-gradient(75% 75% at 126% 0%, #FF000040 1%, #FF000000 99%)')
        );
    });
});