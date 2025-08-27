"use client";

import clsx from "clsx";
import {MenuIcon} from "@/components/icons";
import Logo from "@/components/layout/Logo";
import {Button} from "@/components/ui/Button";
import useNavbarAppear from "./hooks/useNavbarAppear";
import NavbarMenu from "./components/NavbarMenu";
import useNavbarMenuAnimation from "./hooks/useNavbarMenuAnimation";
import NavbarDesktopLinks from "./components/NavbarDesktopLinks";
import NavbarBackgroundOverlay from "./components/NavbarBackgroundOverlay";
import useActiveLinkStore from "@/stores/activeLinkStore";

export default function Navbar() {
    const navbarRef = useNavbarAppear();
    const {
        menuRef, menuButtonRef,
        isMenuOpen, toggleMenu
    } = useNavbarMenuAnimation();

    const { activeLink } = useActiveLinkStore();

    return (
        <div className={"fixed top-0 inset-x-0 z-50 p-4 md:p-5 lg:px-0"} data-animate-appear={"true"}>
            <NavbarBackgroundOverlay />
            <nav ref={navbarRef} className={clsx(
                "bg-on-background max-w-[860px] mx-auto text-white p-navbar rounded-navbar border border-border-menu z-50 relative",
                "backdrop-blur-md"
            )}>
                <div className="flex justify-between items-center">
                    <div className="px-navbar">
                        <Logo />
                    </div>
                    <ul className="flex gap-x-navbar">
                        <NavbarDesktopLinks activeLink={activeLink} />
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
                isOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                ref={menuRef}
            />
        </div>
    );
}