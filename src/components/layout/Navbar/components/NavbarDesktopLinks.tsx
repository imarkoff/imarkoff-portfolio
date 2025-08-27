import navbarLinks from "@/components/layout/Navbar/navbarLinks";
import {LinkButton} from "@/components/ui/Button";
import clsx from "clsx";

interface NavbarDesktopLinksProps {
    activeLink: string;
}

export default function NavbarDesktopLinks(
    {activeLink}: NavbarDesktopLinksProps
) {
    return (
        <>
            {navbarLinks.map((link, index) => (
                <li key={index} className={"hidden sm:block"}>
                    <LinkButton
                        href={link.href}
                        size={"small"}
                        LeftIcon={link.icon}
                        variant={link.isPrimary ? "primary" : "tertiary"}
                        active={link.href === activeLink}
                    >
                        <span className={clsx(
                            "lg:inline-block",
                            {"hidden": !link.isPrimary && link.href !== activeLink}
                        )}>
                            {link.title}
                        </span>
                    </LinkButton>
                </li>
            ))}
        </>
    );
}