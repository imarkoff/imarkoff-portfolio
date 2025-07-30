import {ComponentProps, ComponentType, ReactNode} from "react";
import clsx from "clsx";
import ProgressActivityIcon from "@/components/icons/ProgressActivityIcon";
import IconType from "@/components/icons/IconType";

type ButtonSize = "small" | "medium";

interface ButtonProps extends ComponentProps<'button'> {
    children?: ReactNode;
    /**
     * Variant of the button - determines the background and text color.
     * "primary" for vibrant background,
     * "secondary" for solid background,
     * "tertiary" for transparent background.
     */
    variant?: "primary" | "secondary" | "tertiary";
    /**
     * Color of the button - determines the specific color scheme.
     * "accent" for primary color,
     * "error" for red,
     * "warning" for yellow,
     * "success" for green.
     */
    color?: "accent" | "error" | "warning" | "success";
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
    LeftIcon?: ComponentType<IconType>;
    /** Icon to display on the right side of the button. */
    RightIcon?: ComponentType<IconType>;
}

/**
 * Button component with customizable styles and icons.
 *
 * @description
 * This button component supports different sizes, variants, and colors.
 * It can display text, icons, or both, and supports loading states.
 * It uses Tailwind CSS for styling and clsx for conditional class names.
 *
 * @example
 * ```tsx
 * import Button from "@/app/components/ui/Button";
 *
 * <Button
 *   variant="primary"
 *   color="accent"
 *   size="medium"
 *   isLoading={false}
 *   type="action"
 *   leftIcon={<Icon name="left" />}
 *   rightIcon={<Icon name="right" />}
 *   >
 *   Click Me
 * </Button>
 */
export default function Button(
    {
        className,
        children,
        LeftIcon, RightIcon, isIconButton,
        size = "medium",
        variant = "secondary",
        color = "accent",
        loading,
        active,
        type = "button",
        ...props
    }: ButtonProps
) {
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
        {"border-border-default": variant === "secondary" || variant === "primary"},
        {"border-transparent": variant === "tertiary" && !active},
        {"border border-border-default": variant === "tertiary" && active},
        {"focus-visible:border-active-filled focus-visible:border-background": variant === "primary"},
    );

    const borderRadiusClasses = clsx({
        "rounded-button-md": size === "medium",
        "rounded-button-sm": size === "small",
    });

    const dropShadowClasses = clsx({
        "focus-visible:scale-105 hover:scale-105 active:scale-95": variant === "primary",
        "hover:animate-accent-button-shadow focus-visible:animate-accent-button-shadow": variant === "primary" && color === "accent",
    });

    return (
        <button
            className={clsx(
                "relative",
                "font-semibold box-border leading-0 disabled:opacity-50",
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
            )}
            type={type}
            disabled={loading || props.disabled}
            {...props}
        >
            <span className={clsx(
                "leading-tight inline-flex items-center justify-center",
                {"gap-button-gap-md": size === "medium"},
                {"gap-button-gap-sm": size === "small"},
                "transition-all duration-200",
                loading && "blur-sm"
            )}>
                {LeftIcon && (
                    <LeftIcon className={"size-icon-md"} data-testid={"left-icon"} />
                )}
                {children}
                {RightIcon && (
                    <RightIcon className={"size-icon-md"} data-testid={"right-icon"} />
                )}
            </span>
            {loading && (
                <span className={clsx(
                    "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
                    "size-icon-md"
                )} data-testid="loading-spinner">
                    <ProgressActivityIcon className={"size-icon-md animate-spin"} />
                </span>
            )}
        </button>
    );
}
