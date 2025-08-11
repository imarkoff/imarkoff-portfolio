import HomeIcon from "@/components/icons/HomeIcon";
import AccountCircleIcon from "@/components/icons/AccountCircleIcon";
import WorkIcon from "@/components/icons/WorkIcon";
import CodeIcon from "@/components/icons/CodeIcon";
import ChatIcon from "@/components/icons/ChatIcon";
import IconType from "@/components/icons/IconType";
import {ComponentType} from "react";

type NavbarLink = {
    title: string;
    href: string;
    icon: ComponentType<IconType>;
    isPrimary?: boolean;
}

const navbarLinks: NavbarLink[] = [
    {
        title: 'Home',
        href: '#home',
        icon: HomeIcon,
    },
    {
        title: 'About',
        href: '#about',
        icon: AccountCircleIcon,
    },
    {
        title: 'Projects',
        href: '#projects',
        icon: CodeIcon,
    },
    {
        title: 'Experience',
        href: '#experience',
        icon: WorkIcon,
    },
    {
        title: 'Contact me',
        href: '#contact',
        icon: ChatIcon,
        isPrimary: true,
    }
]

export default navbarLinks;