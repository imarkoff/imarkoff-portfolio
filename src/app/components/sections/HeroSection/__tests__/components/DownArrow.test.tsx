import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import DownArrow from '@/app/components/sections/HeroSection/components/DownArrow';
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
        timeline: vi.fn().mockReturnValue({
            fromTo: vi.fn().mockReturnThis(),
        }),
    },
}));

describe('DownArrow', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders arrow SVG inside a container div', () => {
        const { container } = render(<DownArrow />);

        const svg = container.querySelector('svg');
        const containerDiv = container.querySelector('div');

        expect(svg).toBeTruthy();
        expect(containerDiv).toBeTruthy();
        expect(svg?.getAttribute('width')).toBe('24');
        expect(svg?.getAttribute('height')).toBe('47');
    });

    it('does not create animation timeline when refs are null', () => {
        (useRef as any).mockReturnValue({ current: null });

        render(<DownArrow />);

        expect(gsap.timeline).not.toHaveBeenCalled();
    });

    it('creates animation timeline with correct parameters when refs are available', () => {
        const mockArrowElement = document.createElement('svg');
        const mockContainerElement = document.createElement('div');

        (useRef as any)
            .mockReturnValueOnce({ current: mockArrowElement })
            .mockReturnValueOnce({ current: mockContainerElement });

        const timelineMock = {
            fromTo: vi.fn().mockReturnThis(),
        };
        (gsap.timeline as any).mockReturnValue(timelineMock);

        render(<DownArrow />);

        expect(gsap.timeline).toHaveBeenCalled();
        expect(timelineMock.fromTo).toHaveBeenCalledTimes(3);
    });

    it('animates container with fade-in and elastic animation', () => {
        const mockArrowElement = document.createElement('svg');
        const mockContainerElement = document.createElement('div');

        (useRef as any)
            .mockReturnValueOnce({ current: mockArrowElement })
            .mockReturnValueOnce({ current: mockContainerElement });

        const timelineMock = {
            fromTo: vi.fn().mockReturnThis(),
        };
        (gsap.timeline as any).mockReturnValue(timelineMock);

        render(<DownArrow />);

        expect(timelineMock.fromTo).toHaveBeenCalledWith(
            mockContainerElement,
            {
                opacity: 0,
                y: -10,
            },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "elastic.out(0.5)",
                delay: 5,
            }
        );
    });

    it('animates arrow with bouncing motion', () => {
        const mockArrowElement = document.createElement('svg');
        const mockContainerElement = document.createElement('div');

        (useRef as any)
            .mockReturnValueOnce({ current: mockArrowElement })
            .mockReturnValueOnce({ current: mockContainerElement });

        const timelineMock = {
            fromTo: vi.fn().mockReturnThis(),
        };
        (gsap.timeline as any).mockReturnValue(timelineMock);

        render(<DownArrow />);

        expect(timelineMock.fromTo).toHaveBeenCalledWith(
            mockArrowElement,
            {
                y: 15,
            },
            {
                y: 0,
                duration: 2,
                ease: "elastic.out(0.5)",
                repeat: -1,
                yoyo: true,
            },
            0
        );
    });

    it('animates container with subtle floating motion', () => {
        const mockArrowElement = document.createElement('svg');
        const mockContainerElement = document.createElement('div');

        (useRef as any)
            .mockReturnValueOnce({ current: mockArrowElement })
            .mockReturnValueOnce({ current: mockContainerElement });

        const timelineMock = {
            fromTo: vi.fn().mockReturnThis(),
        };
        (gsap.timeline as any).mockReturnValue(timelineMock);

        render(<DownArrow />);

        expect(timelineMock.fromTo).toHaveBeenCalledWith(
            mockContainerElement,
            {
                y: 5
            },
            {
                y: 0,
                duration: 2,
                ease: "elastic.out(0.5)",
                repeat: -1,
                yoyo: true,
            },
            0
        );
    });
});