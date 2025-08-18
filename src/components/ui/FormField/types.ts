import {ReactNode} from "react";

export type InputState = "default" | "error" | "success";

export interface ExtendedInputProps {
    label?: ReactNode;
    labelIcon?: ReactNode;
    state?: InputState;
    message?: string;
    successMessage?: string;
    maxLength?: number;
}