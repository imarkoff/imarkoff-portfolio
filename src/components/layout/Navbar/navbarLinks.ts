import {ComponentType} from "react";
import {AccountCircleIcon, ChatIcon, CodeIcon, HomeIcon, WorkIcon} from "@/components/icons";
import IconProps from "@/components/icons/types/IconProps";

type NavbarLink = {
    title: string;
    href: string;
    icon: ComponentType<IconProps>;
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