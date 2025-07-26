"use client";

import Link from "next/link";
import Button from "@/app/components/ui/Button";
import clsx from "clsx";
import GradientBlur from "@/app/components/ui/GradientBlur";
import dottedBackground from "@/utils/dottedBackground";
import ChatIcon from "@/app/components/icons/ChatIcon";
import HomeIcon from "@/app/components/icons/HomeIcon";
import AccountCircleIcon from "@/app/components/icons/AccountCircleIcon";
import WorkIcon from "@/app/components/icons/WorkIcon";
import CodeIcon from "@/app/components/icons/CodeIcon";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";
import gsap from "gsap";

export default function Navbar() {
    const navbarRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const navbarContainer = navbarRef.current;
        if (!navbarContainer) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(navbarContainer, {
                yPercent: -100,
                opacity: 0,
            }, {
                delay: 2.5,
                yPercent: 0,
                opacity: 1,
                duration: 1.5,
                ease: "elastic.out(0.5)",
            });
        }, navbarContainer);

        return () => ctx.revert();
    });

    return (
        <div className={"fixed w-full top-0 left-0 z-50 py-5"}>
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
                <div className="container mx-auto flex justify-between items-center">
                    <div className="px-navbar">
                        <Link href={"#home"} className={"text-logo font-bold text-transparent bg-clip-text bg-(image:--gradient-logo)"}>
                            imarkoff
                        </Link>
                    </div>
                    <ul className="flex gap-x-navbar">
                        <li>
                            <Link href={"#home"}>
                                <Button size={"small"} LeftIcon={HomeIcon} variant={"tertiary"} active>
                                    Home
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href={"#about"}>
                                <Button size={"small"} LeftIcon={AccountCircleIcon} variant={"tertiary"}>
                                    About
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href={"#projects"}>
                                <Button size={"small"} LeftIcon={WorkIcon} variant={"tertiary"}>
                                    Projects
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href={"#experience"}>
                                <Button size={"small"} LeftIcon={CodeIcon} variant={"tertiary"}>
                                    Experience
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href={"#contact"}>
                                <Button size={"small"} LeftIcon={ChatIcon} variant={"primary"}>
                                    Contact me
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    );
}