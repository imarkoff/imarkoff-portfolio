"use client";

import Section, {SectionProps} from "@/components/ui/Section";
import useActiveLinkIntersectionObserver from "@/features/homepage/hooks/useActiveLinkIntersectionObserver";

interface HomePageSection extends SectionProps {
    id: string
}

export default function HomePageSection(
    {id, ...props}: HomePageSection
) {
    const sectionRef = useActiveLinkIntersectionObserver(id);

    return (
        <Section
            {...props}
            slotProps={{
                ...props.slotProps,
                section: {
                    ...props.slotProps?.section,
                    ref: sectionRef,
                    id: id,
                },
            }}
        />
    );
}