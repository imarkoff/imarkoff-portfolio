import {HTMLAttributes} from "react";
import clsx from "clsx";

export default function Section({children, className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return (
        <section
            className={clsx(
                "max-w-[1400px] mx-auto",
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
    );
}