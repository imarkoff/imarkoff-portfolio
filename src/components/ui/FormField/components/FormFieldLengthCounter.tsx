import clsx from "clsx";

interface LengthCounterProps {
    maxLength: number;
    currentLength: number;
}

export default function FormFieldLengthCounter(
    {maxLength, currentLength}: LengthCounterProps
) {
    return (
        <div className={clsx(
            "length-counter",
            {"error": currentLength > maxLength},
        )}>
            {currentLength} / {maxLength}
        </div>
    );
}