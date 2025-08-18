import {ReactNode} from "react";
import {ExtendedInputProps} from "@/components/ui/FormField/types";

interface InputLabelProps {
    label?: ReactNode;
    labelIcon?: ExtendedInputProps['labelIcon'];
    htmlFor?: string;
}

export default function FormFieldLabel(
    {label, labelIcon, htmlFor}: InputLabelProps
) {
    if (!label && !labelIcon) {
        return null;
    }

    return (
        <label
            htmlFor={htmlFor}
            className="flex items-center gap-2 input-label"
        >
            {labelIcon}
            {label}
        </label>
    );
}