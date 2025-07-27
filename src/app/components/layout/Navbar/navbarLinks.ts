import HomeIcon from "@/app/components/icons/HomeIcon";
import AccountCircleIcon from "@/app/components/icons/AccountCircleIcon";
import WorkIcon from "@/app/components/icons/WorkIcon";
import CodeIcon from "@/app/components/icons/CodeIcon";
import ChatIcon from "@/app/components/icons/ChatIcon";
import IconType from "@/app/components/icons/IconType";
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
        icon: WorkIcon,
    },
    {
        title: 'Experience',
        href: '#experience',
        icon: CodeIcon
    },
    {
        title: 'Contact me',
        href: '#contact',
        icon: ChatIcon,
        isPrimary: true
    }
]

export default navbarLinks;