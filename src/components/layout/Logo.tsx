import Link, {LinkProps} from "next/link";
import routeConfig from "@/config/routeConfig";
import clsx from "clsx";
import {ComponentProps} from "react";

type LogoProps = Omit<LinkProps, 'href'> & ComponentProps<'a'> & {
    href?: LinkProps['href'];
};

export default function Logo(
    {href = routeConfig.home.path, className, ...props}: LogoProps
) {
    return (
        <Link
            {...props}
            href={href}
            className={clsx("text-logo font-bold text-gradient-logo leading-none", className)}
        >
            imarkoff
        </Link>
    );
}