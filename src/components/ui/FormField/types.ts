import {ReactNode} from "react";

export type InputState = "default" | "error" | "success";

export interface ExtendedInputProps {
    /**
     * Label for the input field shown above the input box.
     */
    label?: ReactNode;

    /**
     * Optional icon to display alongside the label.
     */
    labelIcon?: ReactNode;

    /**
     * State of the input field which can affect its styling.
     * - "default": Standard appearance.
     * - "error": Indicates an error state, often styled with red.
     * - "success": Indicates a successful state, often styled with green.
     *
     * @default "default"
     */
    state?: InputState;

    /**
     * Message to display below the input field,
     * often used for validation feedback.
     */
    message?: string;

    /**
     * Maximum number of characters allowed in the input field.
     * If provided, the current character count will be displayed.
     */
    maxLength?: number;
}