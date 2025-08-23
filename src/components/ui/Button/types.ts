import {ComponentType, ReactNode} from "react";
import IconProps from "@/components/icons/types/IconProps";

export type ButtonSize = "small" | "medium";
export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonColor = "accent" | "success" | "error" | "warning";

export interface ButtonBaseProps {
    children?: ReactNode;
    /**
     * Variant of the button - determines the background and text color.
     * "primary" for vibrant background,
     * "secondary" for solid background,
     * "tertiary" for transparent background.
     */
    variant?: ButtonVariant;
    /**
     * Color of the button - determines the specific color scheme.
     * "accent" for primary color,
     * "error" for red,
     * "warning" for yellow,
     * "success" for green.
     */
    color?: ButtonColor;
    /** Size of the button - determines the padding and font size. */
    size?: ButtonSize;
    /** Indicates if it's purely an icon button (square padding) */
    isIconButton?: boolean;
    /**
     * Indicates if the button is in a loading state.
     * Disables the button and applies a loading style.
     */
    loading?: boolean;
    /** Is the button currently active */
    active?: boolean;
    /** Icon to display on the left side of the button. */
    LeftIcon?: ComponentType<IconProps>;
    /** Icon to display on the right side of the button. */
    RightIcon?: ComponentType<IconProps>;
}