import {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import useActiveLinkStore from "@/stores/activeLinkStore";

export default function useActiveLinkIntersectionObserver(
    id: string
) {
    const halfViewportHeight = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

    const [sectionRef, sectionInView] = useInView({
        rootMargin: `-${halfViewportHeight}px 0px -${halfViewportHeight}px 0px`,
        threshold: 0,
    });

    const { setActiveLink } = useActiveLinkStore();

    useEffect(() => {
        if (sectionInView) {
            setActiveLink(id);
        }
    }, [sectionInView]);

    return sectionRef;
}