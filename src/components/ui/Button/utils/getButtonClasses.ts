import clsx from "clsx";
import {ButtonColor, ButtonSize, ButtonVariant} from "@/components/ui/Button/types";
import IconType from "@/components/icons/IconType";
import {ComponentType} from "react";

interface ButtonClassesProps {
    size: ButtonSize;
    variant: ButtonVariant;
    color: ButtonColor;
    isIconButton?: boolean;
    LeftIcon?: ComponentType<IconType>;
    RightIcon?: ComponentType<IconType>;
    active?: boolean;
    className?: string;
}

export default function getButtonClasses(
    {
        size,
        variant,
        color,
        isIconButton = false,
        LeftIcon,
        RightIcon,
        active = false,
        className
    }: ButtonClassesProps
): string {
    const paddingClasses = clsx({
        // Small size paddings
        "py-button-sm-y": size === "small",
        "px-button-sm-x": size === "small" && !isIconButton && !LeftIcon && !RightIcon,
        "pl-button-icon-sm-x pr-button-sm-x": size === "small" && !!LeftIcon && !RightIcon && !isIconButton,
        "pl-button-sm-x pr-button-icon-sm-x": size === "small" && !LeftIcon && !!RightIcon && !isIconButton,
        "px-button-icon-sm-x": size === "small" && !!LeftIcon && !!RightIcon,
        "px-button-sm-y": size === "small" && isIconButton,

        // Medium size paddings
        "py-button-md-y": size === "medium",
        "px-button-md-x": size === "medium" && !isIconButton && !LeftIcon && !RightIcon,
        "pl-button-icon-md-x pr-button-md-x": size === "medium" && !!LeftIcon && !RightIcon && !isIconButton,
        "pl-button-md-x pr-button-icon-md-x": size === "medium" && !LeftIcon && !!RightIcon && !isIconButton,
        "px-button-icon-md-x": size === "medium" && !!LeftIcon && !!RightIcon,
        "px-button-md-y": size === "medium" && isIconButton,
    });

    const colorClasses = clsx({
        // Secondary Variant
        "bg-on-surface hover:bg-on-surface-hover text-primary": variant === "secondary" && color === "accent",
        "bg-green-tinted hover:bg-green-tinted-hover text-primary": variant === "secondary" && color === "success",
        "bg-red-tinted hover:bg-red-tinted-hover text-primary": variant === "secondary" && color === "error",
        "bg-yellow-tinted hover:bg-yellow-tinted-hover text-primary": variant === "secondary" && color === "warning",

        // Primary Variant
        "bg-active-filled hover:bg-active-filled-hover focus-visible:bg-active-filled-hover text-active-filled-text": variant === "primary" && color === "accent",
        "bg-green-filled hover:bg-green-filled-hover text-green-filled-text": variant === "primary" && color === "success",
        "bg-red-filled hover:bg-red-filled-hover text-red-filled-text": variant === "primary" && color === "error",
        "bg-yellow-filled hover:bg-yellow-filled-hover text-yellow-filled-text": variant === "primary" && color === "warning",

        // Tertiary Variant
        "text-ghost-button-fg": variant === "tertiary",
        "hover:bg-ghost-button-hover-bg hover:bg-ghost-button-hover-fg focus-visible:bg-ghost-button-hover-bg focus-visible:bg-ghost-button-hover-fg": variant === "tertiary",
        "active:bg-ghost-button-active-bg hover:active:bg-ghost-button-active-hover-bg": variant === "tertiary",
        "bg-ghost-button-active-bg text-ghost-button-active-fg": variant === "tertiary" && active,
    });

    const borderClasses = clsx(
        "border",
        {"outline-offset-2": variant === "primary"},
        {"outline-offset-0": variant === "secondary" || variant === "tertiary"},
        {"border-border-default": variant === "secondary" || variant === "primary"},
        {"border-transparent": variant === "tertiary" && !active},
        {"border border-border-default": variant === "tertiary" && active}
    );

    const borderRadiusClasses = clsx({
        "rounded-button-md": size === "medium",
        "rounded-button-sm": size === "small",
    });

    const dropShadowClasses = clsx({
        "focus-visible:scale-105 hover:scale-105 active:scale-95": variant === "primary",
        "hover:animate-accent-button-shadow focus-visible:animate-accent-button-shadow": variant === "primary" && color === "accent",
    });

    return clsx(
        "relative inline-flex items-center justify-center",
        "font-semibold box-border !leading-0 disabled:opacity-50",
        "cursor-pointer disabled:cursor-not-allowed",
        "outline-2 outline-transparent focus-visible:outline-on-surface-focus-border",
        "transition-all duration-200",
        "active:scale-95",
        colorClasses,
        borderClasses,
        borderRadiusClasses,
        paddingClasses,
        dropShadowClasses,
        className
    );
}