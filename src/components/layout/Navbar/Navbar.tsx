"use client";

import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import clsx from "clsx";
import GradientBlur from "@/components/ui/GradientBlur";
import dottedBackground from "@/utils/dottedBackground";
import useNavbarAppear from "@/components/layout/Navbar/hooks/useNavbarAppear";
import navbarLinks from "@/components/layout/Navbar/navbarLinks";
import {useState} from "react";
import MenuIcon from "@/components/icons/MenuIcon";
import NavbarMenu from "@/components/layout/Navbar/components/NavbarMenu";
import useNavbarMenuAnimation from "@/components/layout/Navbar/hooks/useNavbarMenuAnimation";
import LinkButton from "@/components/ui/Button/LinkButton";

export default function Navbar() {
    const navbarRef = useNavbarAppear();
    const {
        menuRef, menuButtonRef,
        isMenuOpen, toggleMenu
    } = useNavbarMenuAnimation();

    const [activeLink, setActiveLink] = useState<string>("#home");

    return (
        <div className={"fixed top-0 inset-x-0 z-50 p-4 md:p-5 lg:px-0"} data-animate-appear>
            <GradientBlur
                direction={"top-to-bottom"}
                background={"linear-gradient(180deg, rgba(21, 23, 25, 75%) 0%, rgba(21, 23, 25, 25%) 33%, rgba(21, 23, 25, 0%) 100%)"}
            />

            <div className={"absolute inset-0"} style={{
                ...dottedBackground("rgba(255, 255, 255, 0.03)", "1px", "10px"),
                maskImage: "linear-gradient(180deg, black 0%, rgba(0, 0, 0, .6) 50%, transparent 100%)",
            }} />
            <nav ref={navbarRef} className={clsx(
                "bg-on-background max-w-[860px] mx-auto text-white p-navbar rounded-navbar border border-border-menu z-50 relative",
                "backdrop-blur-md"
            )}>
                <div className="flex justify-between items-center">
                    <div className="px-navbar">
                        <Link href={"#home"} className={"text-logo font-bold text-gradient-logo"}>
                            imarkoff
                        </Link>
                    </div>
                    <ul className="flex gap-x-navbar">
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
                        <li className={"sm:hidden"}>
                            <Button
                                LeftIcon={MenuIcon}
                                ref={menuButtonRef}
                                size={"small"}
                                isIconButton
                                active={isMenuOpen}
                                title={"Menu"}
                                variant={"tertiary"}
                                onClick={toggleMenu}
                            />
                        </li>
                    </ul>
                </div>
            </nav>
            <NavbarMenu
                activeLink={activeLink}
                setActiveLink={setActiveLink}
                isOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                ref={menuRef}
            />
        </div>

    );
}