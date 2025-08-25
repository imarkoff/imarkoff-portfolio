import clsx from "clsx";
import {Typography} from "@/components/ui/Typography";
import navbarLinks from "@/components/layout/Navbar/navbarLinks";
import {Ref} from "react";
import {LinkButton} from "@/components/ui/Button";

interface NavbarMenuProps {
    activeLink: string;
    isOpen: boolean;
    ref: Ref<HTMLUListElement>;
    toggleMenu: () => void;
}

export default function NavbarMenu({ activeLink, isOpen, ref, toggleMenu }: NavbarMenuProps) {
    const handleLinkClick = () => {
        toggleMenu();
    }

    return (
        <ul ref={ref} className={clsx(
            "absolute top-full mx-4 p-2.5 z-40 flex flex-col gap-y-navbar inset-x-0 sm:hidden",
            "bg-on-background border border-border-menu rounded-navbar backdrop-blur-md",
            {"hidden": !isOpen}
        )}>
            <li className={"px-2.5"}>
                <Typography variant={"caption"} className={"font-semibold"}>
                    Menu
                </Typography>
            </li>
            {navbarLinks.map((link, index) => (
                <li key={index}>
                    <LinkButton
                        href={link.href}
                        onClick={handleLinkClick}
                        size={"small"}
                        LeftIcon={link.icon}
                        variant={link.isPrimary ? "primary" : "tertiary"}
                        active={link.href === activeLink}
                        className={"w-full flex"}
                    >
                        {link.title}
                    </LinkButton>
                </li>
            ))}
        </ul>
    );
}