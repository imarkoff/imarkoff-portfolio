import {Typography, TypographyIcon} from "@/components/ui/Typography";
import Card from "@/components/ui/Card";
import {TechnologiesByCategory} from "@/lib/models/types/TechnologyCategory";
import technologyCategoryMetadata from "@/lib/constants/technologyCategoryMetadata";
import iconMap from "@/components/icons/utils/iconMap";
import Label from "@/components/ui/Label";
import Image from "next/image";
import {Fragment} from "react";
import clsx from "clsx";
import ByTechnologiesScroll from "@/features/homepage/sections/AboutMeSection/components/ByTechnologiesScroll";

export interface ByTechnologiesCardProps {
    technologies: TechnologiesByCategory[];
}

export default function ByTechnologiesCard(
    { technologies }: ByTechnologiesCardProps
) {
    const references = {
        containerId: "technologies.container",
        titleId: "technologies.title",
    };

    return (
        <div id={references.containerId}>
            <ByTechnologiesScroll references={ references } />
            <Typography variant={"h3"} component={"h3"} className={"mb-2.5"} id={references.titleId}>
                By technologies:
            </Typography>
            <Card className={"grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5"}>
                {technologies.map((category, index) => (
                    <Fragment key={category.categoryName}>
                        <TechnologiesGroup category={category} />
                        {technologies.length - 1 !== index && (
                            <div className={clsx(
                                "border-tertiary self-center",
                                "md:border-l border-t md:border-t-0",
                                "w-[60px] md:w-0 md:h-[60px]",
                                {"md:hidden": index % 2 === 1}
                            )} />
                        )}
                    </Fragment>
                ))}
            </Card>
        </div>
    );
}

const TechnologiesGroup = ({category} : { category: TechnologiesByCategory }) => {
    const categoryMetadata = technologyCategoryMetadata[category.categoryName];
    const Icon = iconMap[categoryMetadata.icon];

    return (
        <div className={`mb-4`}>
            <div className={"mb-2 flex items-center gap-2"}>
                <TypographyIcon Icon={Icon} variant={"h3"} />
                <Typography variant={"h3"} component={"h4"}>
                    &nbsp;
                    {categoryMetadata.name}
                </Typography>
            </div>
            <ul className={"flex flex-wrap gap-2.5"} role={"list"}>
                {category.techs.map((tech) => (
                    <li key={tech.slug}>
                        <Label className={"technologies.label"} icon={
                            tech.iconUrl ? <Image
                                src={tech.iconUrl}
                                alt={tech.name}
                                width={20}
                                height={20}
                                className={"rounded-sm"}
                            /> : undefined
                        }>
                            {tech.name}
                        </Label>
                    </li>
                ))}
            </ul>
        </div>
    );
}