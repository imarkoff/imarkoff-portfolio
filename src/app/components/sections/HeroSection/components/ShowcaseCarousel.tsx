"use client";

import VerticalTicker from "@/app/components/ui/VerticalTicker";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

export default function ShowcaseCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!carouselRef.current) return;

        gsap.fromTo(carouselRef.current, {
            xPercent: 100,
            yPercent: 100,
            opacity: 0,
            filter: "blur(60px)",
        }, {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            ease: "elastic.out(0.25)",
            filter: "blur(0px)",
            duration: 3,
            delay: 2
        });
    });

    return (
        <div
            className={"h-full flex gap-5 rotate-[25deg] justify-center items-start overflow-hidden"}
            ref={carouselRef}
        >
            <VerticalTicker spacing={20} direction={"down"} duration={35}>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/imarkoff-portfolio.firebasestorage.app/o/projects%2Fmtdfit%2FLet%20us%20know%20more%20about%20you.png?alt=media&token=60cc9356-a13a-42dd-9976-1ad703951359"
                    alt=""
                    width={250}
                    height={541}
                    className={"rounded-xl"}
                />
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/imarkoff-portfolio.firebasestorage.app/o/projects%2Fmtdfit%2FWorkout%20history%20modal.png?alt=media&token=512b32c6-e8f1-4a9a-863b-440815548dc7"
                    alt=""
                    width={250}
                    height={541}
                    className={"rounded-xl"}
                    style={{
                        boxShadow: "0px 0px 75px 0px rgba(134, 73, 240, 0.2)"
                    }}
                />
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/imarkoff-portfolio.firebasestorage.app/o/projects%2Fmtdfit%2FMesurements%20page.png?alt=media&token=2e2a1918-2f57-4479-a598-fa665c5619c6"
                    alt=""
                    width={250}
                    height={541}
                    className={"rounded-xl"}
                />
            </VerticalTicker>
            <VerticalTicker spacing={20} direction={"up"} duration={35}>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/imarkoff-portfolio.firebasestorage.app/o/projects%2Fmtdfit%2FTraining%20Statistics%20page.png?alt=media&token=677be7be-a625-497b-9fd3-0ecea62e64b1"
                    alt=""
                    width={250}
                    height={541}
                    className={"rounded-xl"}
                />
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/imarkoff-portfolio.firebasestorage.app/o/projects%2Fpsytests%2Fraven-test.png?alt=media&token=1169947d-4f88-4d86-aa28-688659395981"
                    alt=""
                    width={250}
                    height={352}
                    className={"rounded-xl"}
                />
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/imarkoff-portfolio.firebasestorage.app/o/projects%2Fmtdfit%2FClient%20Main%20page.png?alt=media&token=7e2f0766-ec1f-40d1-aef5-a32f79a1b49c"
                    alt=""
                    width={250}
                    height={541}
                    className={"rounded-xl"}
                    style={{
                        boxShadow: "0px 0px 75px 0px rgba(240, 73, 209, 0.2)"
                    }}
                />
            </VerticalTicker>
            <VerticalTicker direction={"down"} spacing={20} duration={35}>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/imarkoff-portfolio.firebasestorage.app/o/projects%2Fmtdfit%2FLet%20us%20know%20more%20about%20you.png?alt=media&token=60cc9356-a13a-42dd-9976-1ad703951359"
                    alt=""
                    width={250}
                    height={541}
                    className={"rounded-xl"}
                />
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/imarkoff-portfolio.firebasestorage.app/o/projects%2Fpsytests%2Fmmpi-evaluation-system.png?alt=media&token=1b2f49ed-2d1a-4700-961a-6e448aac00ca"
                    alt=""
                    width={750}
                    height={557}
                    className={"rounded-xl"}
                />
            </VerticalTicker>
        </div>
    );
}