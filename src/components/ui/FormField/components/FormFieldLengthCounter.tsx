interface LengthCounterProps {
    maxLength: number;
    currentLength: number;
}

export default function FormFieldLengthCounter(
    {maxLength, currentLength}: LengthCounterProps
) {
    return (
        <div className="text-xs text-gray-500">
            {currentLength} / {maxLength}
        </div>
    );
}