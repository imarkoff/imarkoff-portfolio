import {ComponentProps} from "react";
import clsx from "clsx";

export type TypographyVariant = "hero" | "tagline" | "h1" | "h2" | "h3" | "body" | "caption"

interface TypographyProps extends ComponentProps<'p'> {
    /**
     * The HTML element to render as the component.
     * Defaults to "p" for paragraph.
     * */
    component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
    /**
     * The variant of typography to apply.
     * This determines the text style and size.
     */
    variant?: TypographyVariant;

    /** Font family to apply to the text. */
    family?: "sans" | "handwritten";
}

/**
 * Typography component for consistent text styling.
 *
 * This component allows you to specify the HTML element type and variant for text styling.
 * It supports various text styles such as hero, tagline, headings (h1, h2, h3), body text, and captions.
 * You can also pass additional props to customize the component further.
 *
 * @example
 * ```jsx
 * import Typography from "@/app/components/ui/Typography";
 *
 * <Typography variant="hero" component="h1">
 *     Hero Text
 * </Typography>
 * ```
 *
 * @example
 * ```jsx
 * import Typography from "@/app/components/ui/Typography";
 *
 * <Typography variant="body" component="p" className="my-custom-class" family="handwritten">
 *     This is body text with custom styling.
 * </Typography>
 * ```
 */
export default function Typography(
    {
        component = "p",
        variant,
        className,
        children,
        family = "sans",
        ...props
    }: TypographyProps
) {
    const correspondingStyle = {
        hero: "text-hero-sm md:text-hero-md lg:text-hero-lg font-extrabold leading-hero",
        tagline: "text-tagline-sm md:text-tagline-md lg:text-tagline-lg font-extrabold leading-tagline",
        h1: "text-h1-sm md:text-h1-md lg:text-h1-lg font-extrabold",
        h2: "text-h2-sm md:text-h2-md lg:text-h2-lg font-bold",
        h3: "text-h3-sm md:text-h3-md lg:text-h3-lg font-semibold",
        body: "text-body font-normal",
        caption: "text-caption font-normal text-secondary",
    };

    const Component = component;

    return (
        <Component
            className={clsx(
                "leading-normal",
                "tracking-normal",
                className,
                variant ? correspondingStyle[variant] : correspondingStyle.body,
                family === "handwritten" && "font-handwriting",
                family === "sans" && "font-sans"
            )}
            {...props}
        >
            {children}
        </Component>
    );
}