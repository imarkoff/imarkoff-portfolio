import {ComponentProps, ReactNode} from "react";
import clsx from "clsx";

interface SectionProps {
    children: ReactNode;
    slotProps?: {
        root?: ComponentProps<'div'> & { "data-animate-appear"?: boolean };
        section?: ComponentProps<'div'> & { "data-animate-appear"?: boolean };
    }
}

export default function Section({children, slotProps}: SectionProps) {
    const { className, ...props } = slotProps?.section || {};

    return (
        <div
            {...slotProps?.root}
            className={clsx("border-b-2 border-border-menu", slotProps?.root?.className)}
        >
            <section
                className={clsx(
                    "max-w-section mx-auto size-full",
                    "px-section-sm-x py-section-sm-y",
                    "md:px-section-md-x md:py-section-md-y",
                    "lg:px-section-lg-x lg:py-section-lg-y",
                    className
                )}
                role="region"
                {...props}
            >
                {children}
            </section>
        </div>
    );
}