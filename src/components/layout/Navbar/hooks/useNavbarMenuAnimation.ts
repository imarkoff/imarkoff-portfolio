import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

export default function useNavbarMenuAnimation() {
    const menuRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useGSAP(() => {
        const menuElement = menuRef.current;
        if (!menuElement) return;

        gsap.set(menuElement, {
            xPercent: 50,
            yPercent: -75,
            opacity: 0,
            scale: 0
        });
    }, []);

    useEffect(() => {
        const listenForOutsideClick = (event: MouseEvent) => {
            if (!menuRef.current || !menuButtonRef.current) return;

            const target = event.target as HTMLElement;
            const isClickInsideMenu = menuRef.current.contains(target);
            const isClickOnButton = menuButtonRef.current.contains(target);

            if (!isClickInsideMenu && !isClickOnButton) {
                closeMenu();
            }
        }

        document.addEventListener("click", listenForOutsideClick);

        return () => {
            document.removeEventListener("click", listenForOutsideClick);
        };
    }, []);

    const openMenu = () => {
        if (!menuRef.current || isMenuOpen) return;
        setIsMenuOpen(true);
        gsap.to(menuRef.current, {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(0.3)",
        });
    };

    const closeMenu = () => {
        if (!menuRef.current) return;
        gsap.to(menuRef.current, {
            xPercent: 50,
            yPercent: -75,
            opacity: 0,
            scale: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                setIsMenuOpen(false);
            }
        });
    };

    const toggleMenu = () => isMenuOpen ? closeMenu() : openMenu();

    return {
        menuRef, menuButtonRef, isMenuOpen,
        openMenu, closeMenu, toggleMenu
    };
}