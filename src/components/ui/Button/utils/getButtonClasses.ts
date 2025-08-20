import clsx from "clsx";
import {ButtonColor, ButtonSize, ButtonVariant} from "../types";

export interface ButtonClassesProps {
    size?: ButtonSize;
    variant?: ButtonVariant;
    color?: ButtonColor;
    isLoading?: boolean;
    isIconButton?: boolean;
    active?: boolean;
    className?: string;
}

export default function getButtonClasses(
    {
        size = "medium",
        variant = "secondary",
        color,
        isLoading = false,
        isIconButton = false,
        active = false,
        className
    }: ButtonClassesProps
): string {
    return clsx(
        "button",
        {
            "size-medium": size === "medium",
            "size-small": size === "small",
        },
        {
            "primary": variant === "primary",
            "secondary": variant === "secondary",
            "tertiary": variant === "tertiary",
        },
        {
            "success": color === "success",
            "warning": color === "warning",
            "error": color === "error",
        },
        {
            "active": active,
            "loading": isLoading
        },
        {
            "icon-only": isIconButton
        },
        className
    );
}