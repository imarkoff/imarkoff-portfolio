import { vi, describe, it, expect, beforeEach } from 'vitest';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import animateCardContentAppear from '../../animations/animateCardContentAppear';

const mockTimeline = {
    from: vi.fn().mockReturnThis(),
};

vi.mock('gsap', () => ({
    default: {
        timeline: vi.fn(() => mockTimeline),
        registerPlugin: vi.fn(),
    },
}));

vi.mock('gsap/ScrollTrigger', () => ({
    default: {
        create: vi.fn(),
    },
}));

describe('animateCardContentAppear', () => {
    let cardContent: HTMLElement;
    let cardTechLabels: NodeListOf<Element>;
    const index = 1;

    beforeEach(() => {
        vi.clearAllMocks();

        document.body.innerHTML = `
            <div id="card-content">
                <div>Child 1</div>
                <span>Child 2</span>
                <p>Child 3</p>
                <div class="tech-labels">
                    <span class="label">Tech 1</span>
                    <span class="label">Tech 2</span>
                </div>
            </div>
        `;
        cardContent = document.getElementById('card-content') as HTMLElement;
        cardTechLabels = document.querySelectorAll('.label');
    });

    it('creates a ScrollTrigger with the correct parameters', () => {
        animateCardContentAppear(cardContent, cardTechLabels, index);

        expect(ScrollTrigger.create).toHaveBeenCalledWith({
            trigger: cardContent,
            start: "top 75%",
            end: "center center",
            id: `project-card-${index}-appear`,
            toggleActions: "play none none reverse",
            animation: mockTimeline,
        });
    });

    it('creates a gsap timeline', () => {
        animateCardContentAppear(cardContent, cardTechLabels, index);
        expect(gsap.timeline).toHaveBeenCalledWith({});
    });

    it('adds a "from" animation for the card content children', () => {
        animateCardContentAppear(cardContent, cardTechLabels, index);

        expect(mockTimeline.from).toHaveBeenNthCalledWith(
            1,
            cardContent.childNodes,
            {
                y: 100,
                opacity: 0.5,
                stagger: 0.03,
                ease: "back.out",
            },
            "<"
        );
        expect(mockTimeline.from).toHaveBeenNthCalledWith(
            2,
            cardTechLabels,
            {
                x: -50,
                ease: "back.out(1.7)",
                stagger: 0.1
            },
            "<"
        )
    });

    it('adds a "from" animation for the card tech labels', () => {
        animateCardContentAppear(cardContent, cardTechLabels, index);

        expect(mockTimeline.from).toHaveBeenCalledWith(
            cardTechLabels,
            {
                x: -50,
                ease: "back.out(1.7)",
                stagger: 0.1
            },
            "<"
        );
    });

    it('handles card content with no children gracefully', () => {
        cardContent.innerHTML = ''; // Remove all children
        animateCardContentAppear(cardContent, cardTechLabels, index);

        expect(mockTimeline.from).toHaveBeenCalledWith(
            cardContent.childNodes,
            expect.any(Object),
            expect.anything()
        );
    });

    it('returns the created timeline', () => {
        const timeline = animateCardContentAppear(cardContent, cardTechLabels, index);
        expect(timeline).toBe(mockTimeline);
    });
});