import {RefObject} from "react";

interface ArrowSVGProps {
    pathRef: RefObject<SVGPathElement | null>;
    arrowRef: RefObject<SVGPathElement | null>;
}

export default function ArrowSVG({ pathRef, arrowRef }: ArrowSVGProps) {
    return (
        <svg
            width="165"
            height="185"
            viewBox="0 0 165 185"
            fill="none"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <mask id="pathMask">
                    <path
                        d="M2 59.151C21.3333 27.651 69.7 -24.649 108.5 18.151C157 71.651 55.5 124.651 146 157.651"
                        strokeWidth="3"
                        stroke="white"
                        strokeLinecap="round"
                        strokeDasharray="11"
                    />
                </mask>
            </defs>
            <path
                d="M2 59.151C21.3333 27.651 69.7 -24.649 108.5 18.151C157 71.651 55.5 124.651 146 157.651"
                strokeWidth="3"
                strokeLinecap="round"
                ref={pathRef}
                mask="url(#pathMask)"
            />
            <path
                d="M1.5459 2L10.3847 10.8388C10.7753 11.2294 10.7753 11.8625 10.3847 12.253L1.5459 21.0919"
                strokeWidth="3"
                strokeLinecap="round"
                ref={arrowRef}
            />
        </svg>
    );
}