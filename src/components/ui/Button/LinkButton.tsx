import Link from "next/link";
import routeConfig from "@/config/routeConfig";
import {ComponentProps} from "react";
import {ButtonBaseProps} from "@/components/ui/Button/types";
import getButtonClasses from "@/components/ui/Button/utils/getButtonClasses";
import ButtonContent from "@/components/ui/Button/components/ButtonContent";

export type LinkButtonProps = Omit<ComponentProps<'a'>, "href"> & ButtonBaseProps & {
    href: string | URL | ((route: typeof routeConfig) => string);
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
                size, variant, color,
                isIconButton, LeftIcon, RightIcon,
                active, className,
            })}
            {...props}
        >
            <ButtonContent
                size={size}
                LeftIcon={LeftIcon}
                RightIcon={RightIcon}
            >
                {children}
            </ButtonContent>
        </Link>
    );
}