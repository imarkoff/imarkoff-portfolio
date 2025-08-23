import {ComponentProps, ReactNode} from "react";
import clsx from "clsx";

export interface LabelProps extends ComponentProps<'div'> {
    /** Optional icon element to display before the label text */
    icon?: ReactNode;
    /**
     * Color scheme for the label
     * @default "accent"
     */
    color?: "accent" | "blue" | "green" | "red" | "yellow";
    /** Whether to use fully rounded corners (pill shape) */
    rounded?: boolean;
    /** Content of the label */
    children: ReactNode;
}

/**
 * A versatile Label component for displaying concise pieces of information.
 * Supports different color schemes, optional icons, and styling variations.
 *
 * @example
 * // Basic label
 * <Label>Default Label</Label>
 *
 * @example
 * // Colored label with icon
 * <Label icon={<StarIcon />} color="green">Featured</Label>
 *
 * @example
 * // Rounded pill-style label
 * <Label rounded color="red">Alert</Label>
 */
export default function Label(
    {icon, color = "accent", rounded, children, className, ...props}: LabelProps
) {
    return (
        <div
            className={clsx(
                "border border-border-default rounded-button-sm font-medium px-label-x py-label-y",
                "flex items-center gap-label-x",
                {"bg-on-surface text-primary": color === "accent"},
                {"bg-blue-tinted text-blue-filled": color === "blue"},
                {"bg-green-tinted text-green-filled": color === "green"},
                {"bg-red-tinted text-red-filled": color === "red"},
                {"bg-yellow-tinted text-yellow-filled": color === "yellow"},
                {"rounded-full": rounded},
                className
            )}
            {...props}
        >

            {icon}
            {children}
        </div>
    );
}