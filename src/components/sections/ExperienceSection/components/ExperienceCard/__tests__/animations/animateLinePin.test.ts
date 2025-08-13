import {vi, describe, beforeEach, it, expect, Mock} from "vitest";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import animateLinePin from "../../animations/animateLinePin";
import {LineReferences} from "../../types";
import {mockReferences} from "../mocks";

let mockTimeline: {
    to: Mock,
    set: Mock
};

vi.mock('gsap', () => ({
    default: {
        set: vi.fn(),
        registerPlugin: vi.fn(),
        timeline: () => {
            mockTimeline = {
                to: vi.fn().mockReturnThis(),
                set: vi.fn().mockReturnThis(),
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

vi.mock('../../constants', () => ({
   PRESENT_COLOR: "#ff0000"
}));

describe('animateLinePin', () => {
    const references: LineReferences = mockReferences.line;
    let scope: {
        root: HTMLDivElement;
        pin: HTMLDivElement;
        pinChild: HTMLDivElement;
    };

    beforeEach(() => {
        vi.clearAllMocks();

        document.body.innerHTML = `
            <div class="experience-card">
                <div class="${references.pinClassName}">
                    <div class="${references.pinChildClassName}"></div>
                </div>
            </div>
        `;
        scope = {
            root: document.querySelector('.experience-card') as HTMLDivElement,
            pin: document.querySelector(`.${references.pinClassName}`) as HTMLDivElement,
            pinChild: document.querySelector(`.${references.pinChildClassName}`) as HTMLDivElement,
        }
    });

    it('initializes pin with reduced scale', () => {
        animateLinePin(scope.root, references, true);

        expect(gsap.set).toHaveBeenCalledWith(scope.pin, {
            scale: 0.5,
        });
    });

    it('creates scroll-triggered animation for pin', () => {
        animateLinePin(scope.root, references, true);

        expect(ScrollTrigger.create).toHaveBeenCalledWith(
            expect.objectContaining({
                trigger: scope.pin,
                start: "top 70%",
                end: "bottom 70%",
                id: "pin",
                toggleActions: "play none none reverse",
            })
        );
    });

    it('applies active styling for present pins', () => {
        animateLinePin(scope.root, references, true);

        expect(mockTimeline.set).toHaveBeenCalledWith(
            scope.pinChild,
            {
                backgroundColor: "#ff0000",
            },
            "<"
        );
    });

    it('does not apply active styling for non-present pins', () => {
        animateLinePin(scope.root, references, false);

        expect(mockTimeline.set).toHaveBeenCalledWith(
            scope.pinChild,
            {
                backgroundColor: undefined,
            },
            "<"
        );
    });

    it('handles missing pin child gracefully', () => {
        scope.pinChild.remove();

        const result = animateLinePin(scope.root, references, true);

        expect(mockTimeline.set).toHaveBeenCalledWith(
            null,
            {
                backgroundColor: "#ff0000",
            },
            "<"
        );
        expect(result).toBeDefined();
    });
});