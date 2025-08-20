import {PropsWithChildren} from "react";
import {InputState} from "@/components/ui/FormField/types";
import clsx from "clsx";

interface FormFieldProps extends PropsWithChildren {
    state: InputState;
}

export default function FormFieldRoot(
    {children, state}: FormFieldProps
) {
    return (
        <div className={clsx(
            "form-field-box",
            {
                "error": state === "error",
                "success": state === "success",
            }
        )}>
            {children}
        </div>
    );
}