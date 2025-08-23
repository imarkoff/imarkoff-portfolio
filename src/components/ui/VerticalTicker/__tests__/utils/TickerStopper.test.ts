import {describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import TickerStopper from '../../utils/TickerStopper';
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Mock objects
const mockStopTimeline = {
    to: vi.fn().mockReturnThis(),
    kill: vi.fn(),
    play: vi.fn(),
    pause: vi.fn()
};

const mockObserver = {
    kill: vi.fn(),
    onHover: vi.fn(),
    onHoverEnd: vi.fn()
};

const mockScrollTrigger = {
    create: vi.fn(),
    kill: vi.fn()
}

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

vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {
        create: vi.fn(() => mockScrollTrigger),
        kill: vi.fn()
    }
}));

describe('TickerStopper', () => {
    let tickerStrip: HTMLDivElement;
    let mockGsapTimeline: any;
    let tickerStopper: TickerStopper;

    beforeEach(() => {
        vi.clearAllMocks();

        // ScrollTrigger creates only when grandParent is in the DOM
        const grandParent = document.createElement('div');
        const parent = document.createElement('div');
        tickerStrip = document.createElement('div');
        grandParent.classList.add('grand-parent');
        parent.classList.add('parent');
        tickerStrip.classList.add('ticker-strip');
        grandParent.appendChild(parent);
        parent.appendChild(tickerStrip);

        mockGsapTimeline = {
            timeScale: 1,
            pause: vi.fn(),
            play: vi.fn(),
        };

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

    it('creates scroll trigger if grandParent exists', () => {
        expect(mockScrollTrigger.kill).not.toHaveBeenCalled();
        expect(ScrollTrigger.create).toHaveBeenCalledWith({
            trigger: tickerStrip.parentElement?.parentElement,
            start: "top top",
            end: "bottom top",
            onEnter: expect.any(Function),
            onLeave: expect.any(Function),
            onEnterBack: expect.any(Function),
            onLeaveBack: expect.any(Function)
        });
    });

    it('does not create scroll trigger if grandParent does not exist', () => {
        (ScrollTrigger.create as Mock).mockClear();
        const voidStrip = document.createElement('div');

        tickerStopper = new TickerStopper(voidStrip, mockGsapTimeline);

        expect(ScrollTrigger.create).not.toHaveBeenCalled();
    });

    it('scroll trigger receives correct callbacks', () => {
        const createCall = (ScrollTrigger.create as Mock).mock.calls[0][0];

        createCall.onEnter();
        expect(mockGsapTimeline.play).toHaveBeenCalledTimes(1);

        createCall.onLeave();
        expect(mockGsapTimeline.pause).toHaveBeenCalledTimes(1);

        createCall.onEnterBack();
        expect(mockGsapTimeline.play).toHaveBeenCalledTimes(2);

        createCall.onLeaveBack();
        expect(mockGsapTimeline.pause).toHaveBeenCalledTimes(2);
    });

    it('cleans up resources when destroyed', () => {
        tickerStopper.destroy();

        expect(mockObserver.kill).toHaveBeenCalled();
        expect(mockScrollTrigger.kill).toHaveBeenCalled();
        expect(mockStopTimeline.kill).toHaveBeenCalled();
    });
});