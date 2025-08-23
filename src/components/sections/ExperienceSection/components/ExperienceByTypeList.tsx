import { ComponentType } from "react";
import experienceMetadata from "@/lib/constants/experienceMetadata";
import ExperienceType from "@/lib/models/types/ExperienceType";
import iconMap from "@/components/icons/IconMap";
import {Typography, TypographyIcon} from "@/components/ui/Typography";
import ExperienceCard from "./ExperienceCard/ExperienceCard";
import ExperienceItem from "@/lib/models/ExperienceItem";
import IconType from "@/components/icons/IconType";

export interface ExperienceByTypeListProps {
    type: ExperienceType;
    items: ExperienceItem[];
}

export default function ExperienceByTypeList(
    {type, items}: ExperienceByTypeListProps
) {
    const metadata = experienceMetadata[type];
    const Icon = iconMap[metadata.icon];

    return (
        <>
            <TypeHeader Icon={Icon} title={metadata.title}/>
            <ExperienceList items={items}/>
        </>
    );
}

const TypeHeader = (
    {Icon, title}: { Icon: ComponentType<IconType>; title: string }
) => (
    <div className={"flex gap-2.5 items-center lg:justify-center"}>
        <TypographyIcon Icon={Icon} variant={"h1"}/>
        <Typography component={"h2"} variant={"h1"}>
            {title}
        </Typography>
    </div>
);

const ExperienceList = (
    {items}: { items: ExperienceByTypeListProps["items"] }
) => (
    <div>
        {items.map((item, index) => (
            <ExperienceCard
                experience={item}
                index={{
                    current: index,
                    total: items.length
                }}
                key={index}
            />
        ))}
    </div>
);