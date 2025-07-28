import { describe, it, expect, vi, beforeEach } from 'vitest';
import TickerStopper from '../../../VerticalTicker/utils/TickerStopper';

// Mock objects
const mockStopTimeline = {
    to: vi.fn().mockReturnThis(),
    kill: vi.fn()
};

const mockObserver = {
    kill: vi.fn(),
    onHover: vi.fn(),
    onHoverEnd: vi.fn()
};

vi.mock('gsap', () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: vi.fn(() => mockStopTimeline)
    }
}));

vi.mock('gsap/Observer', () => ({
    Observer: {
        create: vi.fn(({ onHover, onHoverEnd }) => {
            mockObserver.onHover = onHover;
            mockObserver.onHoverEnd = onHoverEnd;
            return mockObserver;
        })
    }
}));

describe('TickerStopper', () => {
    let tickerStrip: HTMLDivElement;
    let mockGsapTimeline: any;
    let tickerStopper: TickerStopper;

    beforeEach(() => {
        vi.clearAllMocks();

        tickerStrip = document.createElement('div');
        mockGsapTimeline = { timeScale: 1 };

        tickerStopper = new TickerStopper(tickerStrip, mockGsapTimeline);
    });

    it('pauses animation when ticker is hovered', () => {
        mockObserver.onHover();

        expect(mockStopTimeline.to).toHaveBeenCalledWith(
            mockGsapTimeline,
            {
                timeScale: 0,
                duration: 0.5,
                ease: "power2.out"
            }
        );
    });

    it('resumes animation when hover ends', () => {
        mockObserver.onHoverEnd();

        expect(mockStopTimeline.to).toHaveBeenCalledWith(
            mockGsapTimeline,
            {
                timeScale: 1,
                duration: 0.5,
                ease: "power2.in"
            },
            "-=0.2"
        );
    });

    it('cleans up resources when destroyed', () => {
        tickerStopper.destroy();

        expect(mockObserver.kill).toHaveBeenCalled();
        expect(mockStopTimeline.kill).toHaveBeenCalled();
    });
});