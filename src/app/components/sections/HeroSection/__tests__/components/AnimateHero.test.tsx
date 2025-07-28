import { render, cleanup } from '@testing-library/react';
import {describe, it, expect, vi, beforeEach, afterEach, Mock} from 'vitest';
import AnimateHero from '../../components/AnimateHero';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

vi.mock('@gsap/react', () => ({
    useGSAP: vi.fn(),
}));

const mockTimeline = {
    fromTo: vi.fn(),
    set: vi.fn(),
    kill: vi.fn(),
};
vi.mock('gsap', async (importOriginal) => {
    const actual: typeof gsap = await importOriginal();
    return {
        ...actual,
        default: {
            timeline: vi.fn(() => mockTimeline),
        },
    };
});

const mockSplitTextInstance = { chars: ['m', 'o', 'c', 'k'] };
vi.mock('gsap/SplitText', () => ({
    SplitText: vi.fn(() => mockSplitTextInstance),
}));

const mockUseGSAP = useGSAP as Mock;
const mockGsapTimeline = gsap.timeline as Mock;
const mockSplitText = SplitText as unknown as Mock;

describe('AnimateHero', () => {
    const defaultProps = {
        greeting: { hiId: 'hi', otherId: 'other' },
        nameId: 'name',
        taglineId: 'tagline',
        labelId: 'label',
        buttonWrapperClassName: 'btn-wrapper',
    };

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="hi"></div>
            <div id="other"></div>
            <h2 id="name"></h2>
            <p id="tagline"></p>
            <div class="btn-wrapper"></div>
            <div class="btn-wrapper"></div>
            <span id="label"></span>
        `;
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('should run all animations when all elements are found', () => {
        let contextFunc: Function | undefined;
        mockUseGSAP.mockImplementation((func) => {
            contextFunc = func;
        });

        render(<AnimateHero {...defaultProps} />);
        contextFunc?.();

        expect(mockGsapTimeline).toHaveBeenCalledTimes(1);
        expect(mockTimeline.fromTo).toHaveBeenCalled();
        expect(mockTimeline.set).toHaveBeenCalled();
    });

    it('should not run animations and log a warning if an element is missing', () => {
        document.body.innerHTML = '<div id="hi"></div>'; // Missing most elements
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        let contextFunc: Function | undefined;
        mockUseGSAP.mockImplementation((func) => {
            contextFunc = func;
        });

        render(<AnimateHero {...defaultProps} />);
        contextFunc?.();

        expect(consoleWarnSpy).toHaveBeenCalledWith("HeroAnimator: One or more elements not found. Animation will not run.");
        expect(mockGsapTimeline).not.toHaveBeenCalled();
        consoleWarnSpy.mockRestore();
    });

    it('should not run animations if button elements are missing', () => {
        document.body.innerHTML = `
            <div id="hi"></div>
            <div id="other"></div>
            <h2 id="name"></h2>
            <p id="tagline"></p>
            <span id="label"></span>
        `; // No elements with 'btn-wrapper' class
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        let contextFunc: Function | undefined;
        mockUseGSAP.mockImplementation((func) => {
            contextFunc = func;
        });

        render(<AnimateHero {...defaultProps} />);
        contextFunc?.();

        expect(consoleWarnSpy).toHaveBeenCalledWith("HeroAnimator: One or more elements not found. Animation will not run.");
        expect(mockGsapTimeline).not.toHaveBeenCalled();
        consoleWarnSpy.mockRestore();
    });

    it('should call the cleanup function to kill the timeline on unmount', () => {
        let cleanupFunc: (() => void) | undefined;
        mockUseGSAP.mockImplementation((effect) => {
            cleanupFunc = effect();
        });

        render(<AnimateHero {...defaultProps} />);

        expect(cleanupFunc).toBeDefined();

        // Manually call the cleanup function to simulate unmounting.
        cleanupFunc?.();

        expect(mockTimeline.kill).toHaveBeenCalledTimes(1);
    });

    it('should correctly configure the name animation with SplitText', () => {
        let contextFunc: Function | undefined;
        mockUseGSAP.mockImplementation((func) => {
            contextFunc = func;
        });

        render(<AnimateHero {...defaultProps} />);
        contextFunc?.();

        const nameElement = document.getElementById('name');
        expect(mockSplitText).toHaveBeenCalledWith(nameElement, { type: "chars" });
        expect(mockTimeline.fromTo).toHaveBeenCalledWith(
            mockSplitTextInstance.chars,
            expect.any(Object),
            expect.any(Object),
            expect.any(String)
        );
    });
});