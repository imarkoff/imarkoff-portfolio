import {ComponentProps} from "react";
import Link from "next/link";
import routeConfig, {RouteConfig} from "@/config/routeConfig";
import {ButtonBaseProps} from "./types";
import ButtonContent from "./components/ButtonContent";
import getButtonClasses from "./utils/getButtonClasses";

export type LinkButtonProps = Omit<ComponentProps<'a'>, "href"> & ButtonBaseProps & {
    href: string | URL | ((route: RouteConfig) => string);
};

/**
 * LinkButton component is a styled link that behaves like a button.
 *
 * @example
 * ```tsx
 * <LinkButton
 *   href="#about"
 *   rel="noopener noreferrer"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <LinkButton
 *   href={(route) => route.projects}
 *   target="_blank"
 *   rel="noopener noreferrer"
 * />
 */
export default function LinkButton(
    {
        href,
        target,
        rel,
        className,
        size = "medium",
        variant = "secondary",
        color = "accent",
        isIconButton,
        LeftIcon,
        RightIcon,
        active,
        children,
        ...props
    }: LinkButtonProps
) {
    let finalHref: string;

    if (typeof href === "function") {
        finalHref = href(routeConfig);
    } else if (href instanceof URL) {
        finalHref = href.toString();
    } else {
        finalHref = href;
    }

    return (
        <Link
            href={finalHref}
            target={target}
            rel={rel}
            className={getButtonClasses({
                size, variant, color, isIconButton,
                active, className
            })}
            {...props}
        >
            <ButtonContent
                LeftIcon={LeftIcon}
                RightIcon={RightIcon}
            >
                {children}
            </ButtonContent>
        </Link>
    );
}