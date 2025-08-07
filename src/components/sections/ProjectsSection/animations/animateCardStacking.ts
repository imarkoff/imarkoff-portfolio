import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPACE_BETWEEN_STACKED_CARDS = 25; // px

export default function animateCardStacking(
    card: Element,
    index: number,
    indexFromEnd: number,
    lastCard: Element
) {
    const heightDiffWithLastCard = lastCard.clientHeight - card.clientHeight;

    const cardAnimation = gsap.fromTo(card, {
        filter: "brightness(1)",
    }, {
        y: -heightDiffWithLastCard -indexFromEnd * SPACE_BETWEEN_STACKED_CARDS,
        // borderColor: "var(--color-border-menu)", // too heavy on performance
        // marginBottom: heightDiffWithLastCard, // too heavy on performance
        filter: `brightness(${Math.max(1 - indexFromEnd * 0.2, 0.5)})`,
        scale: 1 - indexFromEnd * 0.05,
    });

    ScrollTrigger.create({
        trigger: card,
        start: `bottom center`,
        end: `bottom top`,
        id: `project-card-${index}`,
        scrub: true,
        // markers: true,
        animation: cardAnimation
    });

    return cardAnimation;
}