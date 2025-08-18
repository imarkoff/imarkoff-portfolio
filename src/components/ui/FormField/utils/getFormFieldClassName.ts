import {InputState} from "@/components/ui/FormField/types";
import clsx from "clsx";

export default function getFormFieldClassName(
    state: InputState = "default",
    className?: string
) {
    return clsx(
        "input",
        {
            "error": state === "error",
            "success": state === "success"
        },
        className
    );
}