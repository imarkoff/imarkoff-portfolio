import {ComponentProps} from "react";
import clsx from "clsx";

interface CardProps extends ComponentProps<'div'> {
    /**
     * The HTML element to render as the component.
     * @default "div"
     */
    component?: "article" | "section" | "div";

    size?: "sm" | "md";
}

export default function Card({component = "div", size = "md", className, children, ...props}: CardProps) {
    const Component = component;

    return (
        <Component
            className={clsx(
                "bg-on-background",
                "border border-border-menu rounded-card",
                "shadow-card",
                {"p-card-sm": size === "sm", "p-card": size === "md"},
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
}