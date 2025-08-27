import {Typography, TypographyIcon} from "@/components/ui/Typography";
import Card from "@/components/ui/Card";
import {TechnologiesSlugsByCategory} from "@/lib/models/types/TechnologyCategory";
import technologyCategoryMetadata from "@/lib/constants/technologyCategoryMetadata";
import iconMap from "@/components/icons/utils/iconMap";
import {Fragment} from "react";
import clsx from "clsx";
import ByTechnologiesScroll from "@/features/homepage/sections/AboutMeSection/components/ByTechnologiesScroll";
import {SSGSlugTechnologyLabel} from "@/components/ui/TechnologyLabel";
import AboutMe from "@/lib/models/AboutMe";

export interface ByTechnologiesCardProps {
    technologies: AboutMe['technologiesCategories'];
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

const TechnologiesGroup = ({category} : { category: TechnologiesSlugsByCategory }) => {
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
                {category.techs.map((slug) => (
                    <li key={slug}>
                        <SSGSlugTechnologyLabel technologySlug={slug} />
                    </li>
                ))}
            </ul>
        </div>
    );
}