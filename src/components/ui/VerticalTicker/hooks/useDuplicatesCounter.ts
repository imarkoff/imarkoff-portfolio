import {RefObject, useLayoutEffect, useState} from "react";

/**
 * Custom hook to calculate the number of duplicates needed for a
 * seamless vertical ticker effect.
 * @param contentRef - Reference to the content element of the ticker.
 * @param tickerStripRef - Reference to the ticker strip element.
 * @param spacing - Spacing between ticker items.
 */
export default function useDuplicatesCounter(
    contentRef: RefObject<HTMLDivElement | null>,
    tickerStripRef: RefObject<HTMLDivElement | null>,
    spacing: number
) {
    const [duplicatesQuantity, setDuplicatesQuantity] = useState(1);

    useLayoutEffect(() => {
        if (!contentRef.current || !tickerStripRef.current) return;

        const contentHeight = contentRef.current.offsetHeight;
        const containerHeight = tickerStripRef.current.parentElement?.offsetHeight || 0;
        const requiredDuplicates = Math.ceil(containerHeight / (contentHeight + spacing));

        setDuplicatesQuantity(requiredDuplicates);
    }, [contentRef, tickerStripRef, spacing]);

    return duplicatesQuantity;
}