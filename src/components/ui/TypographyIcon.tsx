import {ComponentProps, ComponentType} from "react";
import { TypographyVariant } from "./Typography";
import IconType from "@/components/icons/IconType";
import clsx from "clsx";

interface TypographyIconProps extends ComponentProps<'svg'> {
    Icon: ComponentType<IconType>;
    variant?: TypographyVariant;
}

export default function TypographyIcon({ Icon, variant = "body", className, ...props }: TypographyIconProps) {
    const correspondingStyle: Record<TypographyVariant, string> = {
        hero: "size-icon-hero-sm md:size-icon-hero-md lg:size-icon-hero-lg",
        tagline: "size-icon-h1-sm md:size-icon-h1-md lg:size-icon-h1-lg",
        h1: "size-icon-h1-sm md:size-icon-h1-md lg:size-icon-h1-lg",
        h2: "size-icon-h2-sm md:size-icon-h2-md lg:size-icon-h2-lg",
        h3: "size-icon-h3-sm md:size-icon-h3-md lg:size-icon-h3-lg",
        body: "size-icon-body",
        caption: "size-icon-caption",
    };

    return (
        <Icon className={clsx(correspondingStyle[variant], className)} {...props} />
    );
};