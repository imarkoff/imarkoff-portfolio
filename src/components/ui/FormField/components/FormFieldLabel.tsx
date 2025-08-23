import {ReactNode} from "react";
import {ExtendedInputProps} from "../types";

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
            className="form-field-label"
        >
            {labelIcon}
            {label}
        </label>
    );
}