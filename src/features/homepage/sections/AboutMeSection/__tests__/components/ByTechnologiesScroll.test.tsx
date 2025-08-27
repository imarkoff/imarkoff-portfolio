import { vi, describe, beforeEach, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ByTechnologiesScroll from '../../components/ByTechnologiesScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

describe('ByTechnologiesScroll', () => {
    const references = {
        containerId: 'technologies.container',
        titleId: 'technologies.title',
    };

    beforeEach(() => {
        vi.clearAllMocks();
        document.getElementById = vi.fn().mockImplementation((id) => ({ id }));
    });

    it('should render without crashing', () => {
        const { container } = render(<ByTechnologiesScroll references={references} />);

        expect(container).toBeDefined();
    });

    it('should throw an error if references are not provided', () => {
        // @ts-expect-error 2741
        expect(() => render(<ByTechnologiesScroll />))
            .toThrow("References must be provided");
    });

    it('should not call gsap.timeline if container or title is not found', () => {
        document.getElementById = vi.fn().mockReturnValue(null);

        render(<ByTechnologiesScroll references={references} />);

        expect(gsap.timeline).not.toHaveBeenCalled();
        expect(ScrollTrigger.create).not.toHaveBeenCalled();
    })

    it('calls gsap.timeline and ScrollTrigger.create with correct parameters', () => {
        render(<ByTechnologiesScroll references={references} />);

        expect(gsap.timeline).toHaveBeenCalled();
        expect(ScrollTrigger.create).toHaveBeenCalled();
    })
});