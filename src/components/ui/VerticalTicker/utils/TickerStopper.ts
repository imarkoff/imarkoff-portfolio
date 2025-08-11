import gsap from "gsap";
import {Observer} from "gsap/Observer";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer, ScrollTrigger);

/**
 * Class to handle stopping and resuming the ticker animation on hover.
 * Correctly handles animation resume after short hover.
 * Also, automatically pauses the ticker when the user scrolls away from the ticker strip.
 */
export default class TickerStopper {
    private tl: GSAPTimeline;
    private observer?: Observer;
    private scrollTrigger?: ScrollTrigger;

    /**
     * Creates an instance of TickerStopper.
     * @param tickerStrip - The ticker strip HTML element to observe for hover events.
     * @param tl - The GSAP timeline that controls the ticker animation.
     */
    constructor(tickerStrip: HTMLDivElement, tl: GSAPTimeline) {
        this.tl = gsap.timeline({});
        this.setupObserver(tickerStrip, tl);
        this.setupScrollTrigger(tickerStrip, tl);
    }

    /** Destroys the observer and stops the timeline. */
    destroy() {
        this.tl.kill();
        this.observer?.kill();
        this.scrollTrigger?.kill();
    }

    private setupObserver(
        tickerStrip: HTMLDivElement,
        tl: GSAPTimeline
    ) {
        this.observer = Observer.create({
            target: tickerStrip,
            type: "pointer",
            onHover: () => {
                this.tl.to(tl, {
                    timeScale: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            },
            onHoverEnd: () => {
                this.tl.to(tl, {
                    timeScale: 1,
                    duration: 0.5,
                    ease: "power2.in"
                }, "-=0.2");
            }
        });
    }

    private setupScrollTrigger(
        tickerStrip: HTMLDivElement,
        tl: GSAPTimeline
    ) {
        const grandParent = tickerStrip.parentElement?.parentElement;
        if (grandParent) {
            this.scrollTrigger = ScrollTrigger.create({
                trigger: grandParent,
                start: "top top",
                end: "bottom top",
                onEnter: () => tl.play(),
                onLeave: () => tl.pause(),
                onEnterBack: () => tl.play(),
                onLeaveBack: () => tl.pause(),
            });
        }
    }
}