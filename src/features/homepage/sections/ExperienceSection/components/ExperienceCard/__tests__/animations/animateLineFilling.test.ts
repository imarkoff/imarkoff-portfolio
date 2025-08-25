import {vi, describe, beforeEach, it, expect, Mock} from "vitest";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {mockReferences} from "../mocks";
import animateLineFilling from "../../animations/animateLineFilling";

let mockTimeline: { to: Mock };

vi.mock('gsap', () => ({
    default: {
        set: vi.fn(),
        registerPlugin: vi.fn(),
        timeline: () => {
            mockTimeline = {
                to: vi.fn(),
            };
            return mockTimeline;
        }
    }
}));

vi.mock('gsap/ScrollTrigger', () => ({
    default: {
        create: vi.fn(),
    }
}));

describe('animateLineFilling', () => {
    const references = mockReferences.line;
    let scope: {
        root: HTMLDivElement;
        filledLine: HTMLElement;
    };

    beforeEach(() => {
        vi.clearAllMocks();

        document.body.innerHTML = `
            <div class="experience-card">
                <div class="${references.filledLineClassName}"></div>
            </div>
        `;
        scope = {
            root: document.querySelector('.experience-card') as HTMLDivElement,
            filledLine: document.querySelector(`.${references.filledLineClassName}`) as HTMLElement,
        };
    })

    it('initializes filled line with zero scale', () => {
        animateLineFilling(scope.root, references.filledLineClassName);

        expect(gsap.set).toHaveBeenCalledWith(
            scope.filledLine,
            { scaleY: 0 }
        );
    });

    it('creates scroll-triggered animation for filled line', () => {
        animateLineFilling(scope.root, references.filledLineClassName);

        expect(ScrollTrigger.create).toHaveBeenCalledWith(
            expect.objectContaining({
                trigger: scope.root,
                start: "top 65%",
                end: "bottom 65%",
                id: "filled-line",
                scrub: true,
            })
        );
    });

    it('animates filled line to full scale', () => {
        animateLineFilling(scope.root, references.filledLineClassName);

        expect(mockTimeline.to).toHaveBeenCalledWith(
            scope.filledLine,
            { scaleY: 1 }
        );
    });
});