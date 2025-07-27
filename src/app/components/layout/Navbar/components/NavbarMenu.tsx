import clsx from "clsx";
import Typography from "@/app/components/ui/Typography";
import navbarLinks from "@/app/components/layout/Navbar/navbarLinks";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import {Ref} from "react";

interface NavbarMenuProps {
    activeLink: string;
    setActiveLink: (link: string) => void;
    isOpen: boolean;
    ref: Ref<HTMLUListElement>;
    toggleMenu: () => void;
}

export default function NavbarMenu({ activeLink, setActiveLink, isOpen, ref, toggleMenu }: NavbarMenuProps) {
    const handleLinkClick = (href: string) => {
        setActiveLink(href);
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
                    <Link href={link.href} onClick={() => handleLinkClick(link.href)}>
                        <Button
                            size={"small"}
                            LeftIcon={link.icon}
                            variant={link.isPrimary ? "primary" : "tertiary"}
                            active={link.href === activeLink}
                            className={"w-full flex"}
                        >
                            {link.title}
                        </Button>
                    </Link>
                </li>
            ))}
        </ul>
    );
}