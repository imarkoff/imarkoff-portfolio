import gsap from "gsap";
import {Observer} from "gsap/Observer";

gsap.registerPlugin(Observer);

/**
 * Class to handle stopping and resuming the ticker animation on hover.
 * Correctly handles animation resume after short hover.
 */
export default class TickerStopper {
    private observer: Observer;
    private stopTl: GSAPTimeline;

    /**
     * Creates an instance of TickerStopper.
     * @param tickerStrip - The ticker strip HTML element to observe for hover events.
     * @param tl - The GSAP timeline that controls the ticker animation.
     */
    constructor(tickerStrip: HTMLDivElement, tl: GSAPTimeline) {
        this.stopTl = gsap.timeline({});
        this.observer = Observer.create({
            target: tickerStrip,
            type: "pointer",
            onHover: () => {
                this.stopTl.to(tl, {
                    timeScale: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            },
            onHoverEnd: () => {
                this.stopTl.to(tl, {
                    timeScale: 1,
                    duration: 0.5,
                    ease: "power2.in"
                }, "-=0.2");
            }
        });
    }

    /** Destroys the observer and stops the timeline. */
    destroy() {
        this.observer.kill();
        this.stopTl.kill();
    }
}