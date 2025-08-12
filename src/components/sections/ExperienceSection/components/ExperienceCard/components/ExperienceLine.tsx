import clsx from "clsx";
import {ExperienceCardIndex, LineReferences} from "../types";

interface ExperienceLineProps {
    references: LineReferences;
    index: ExperienceCardIndex;
}

export default function ExperienceLine(
    {references, index}: ExperienceLineProps
) {
    return (
        <div className={"w-5 self-stretch relative"}>
            <Pin referenceClassName={references.pinClassName} />
            <div className={clsx(
                "flex flex-col items-center h-full gap-2.5",
                {"mask-t-from-80%": index.current === 0},
                {"mask-b-from-80%": index.current === index.total - 1},
            )}>
                <DashedLine />
                <FilledLine referenceClassName={references.filledLineClassName} />
            </div>
        </div>
    );
}

const Pin = (
    {referenceClassName}: { referenceClassName: string }
) => (
    <div className={clsx(
        referenceClassName,
        "p-2 bg-background rounded-full z-10",
        "absolute left-1/2 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2"
    )}>
        <div className={"p-0.5 bg-tertiary rounded-full"}>
            <div className={"p-1 border-4 border-background rounded-full"}/>
        </div>
    </div>
);

const DashedLine = () => (
    <svg
        width="2" height="100%" viewBox="0 0 2 100%"
        preserveAspectRatio="none" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
    >
        <line
            x1="1" y1="0" x2="1" y2="100%"
            stroke="var(--color-tertiary)"
            strokeOpacity="0.35"
            strokeWidth="2" strokeDasharray="6 6"
        />
    </svg>
);

const FilledLine = (
    {referenceClassName}: { referenceClassName: string }
) => (
    <div className={clsx(
        referenceClassName,
        "w-0.5 bg-active-filled-hover origin-top",
        "absolute left-1/2 -translate-x-1/2 inset-0"
    )} />
);