import { describe, beforeEach, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import AboutMeScroll from '../../components/AboutMeScroll';

vi.mock('gsap', () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: vi.fn(() => ({
            fromTo: vi.fn().mockReturnThis()
        }))
    }
}));

vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {
        create: vi.fn()
    }
}));

vi.mock('@gsap/react', () => ({
    useGSAP: (callback: () => void) => callback()
}));

describe('AboutMeScroll', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.getElementById = vi.fn().mockImplementation((id) => ({ id }));
    });

    it('renders without crashing', () => {
        const refs = {
            aboutMeGridLayoutId: 'grid-id',
            aboutMeContentColumnId: 'content-id',
            byTheNumbersContainerId: 'numbers-id',
            byTheNumbersHeadingId: 'heading-id'
        };

        const { container } = render(<AboutMeScroll references={refs} />);
        expect(container).toBeDefined();
    });

    it('handles missing DOM elements gracefully', () => {
        document.getElementById = vi.fn().mockReturnValue(null);
        const refs = {
            aboutMeGridLayoutId: 'missing-id',
            aboutMeContentColumnId: 'missing-id',
            byTheNumbersContainerId: 'missing-id',
            byTheNumbersHeadingId: 'missing-id'
        };

        expect(() => render(<AboutMeScroll references={refs} />))
            .not.toThrow();
    });

    it('throws an error if called without references', () => {
        // @ts-expect-error 2741 - Argument of type '{}' is not assignable to parameter of type 'AboutMeReferences'.
        expect(() => render(<AboutMeScroll />))
            .toThrow('References must be provided');
    });
});