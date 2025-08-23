"use client";

import VerticalTicker from "@/components/ui/VerticalTicker";
import Image from "next/image";
import ShowcaseImage from "@/lib/models/ShowcaseImage";
import useCarouselAppear from "./hooks/useCarouselAppear";

export default function ShowcaseCarousel({showcases}: { showcases: Array<ShowcaseImage[]> }) {
    const carouselRef = useCarouselAppear();
    // without delay animation will be more interesting
    // but appearing and ticking will cause performance issues on low-end devices
    const tickerStartDelay = 4.5;

    return (
        <div
            className={"h-full flex gap-5 rotate-[25deg] justify-center items-start overflow-hidden"}
            ref={carouselRef}
        >
            {showcases.map((showcaseColumn, index) => (
                <VerticalTicker
                    spacing={20}
                    direction={index % 2 === 0 ? "down" : "up"}
                    speed={0.35}
                    startDelay={tickerStartDelay}
                    key={index}
                >
                    {showcaseColumn.map((image, imageIndex) => (
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className={"rounded-xl"}
                            key={image.id ?? imageIndex}
                        />
                    ))}
                </VerticalTicker>
            ))}
        </div>
    );
}