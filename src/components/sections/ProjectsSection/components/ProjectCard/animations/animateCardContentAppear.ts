import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function animateCardContentAppear(
    cardContent: Element,
    cardTechLabels: NodeListOf<Element>,
    index: number,
) {
    const appearTl = gsap.timeline({});

    ScrollTrigger.create({
        trigger: cardContent,
        start: "top 75%",
        end: "center center",
        id: `project-card-${index}-appear`,
        toggleActions: "play none none reverse",
        // markers: true,
        animation: appearTl,
    });

    const cardChildren = cardContent?.childNodes || [];

    appearTl.from(cardChildren, {
        y: 100,
        opacity: 0.5,
        stagger: 0.03,
        ease: "back.out",
    }, "<");
    appearTl.from(cardTechLabels, {
        x: -50,
        ease: "back.out(1.7)",
        stagger: 0.1
    }, "<");

    return appearTl;
}