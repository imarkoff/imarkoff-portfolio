import {PropsWithChildren} from "react";
import {InputState} from "../types";

interface FormFieldProps extends PropsWithChildren {
    state: InputState;
}

export default function FormFieldRoot(
    {children, state}: FormFieldProps
) {
    return (
        <div
            className={"form-field-box"}
            data-state={state}
        >
            {children}
        </div>
    );
}