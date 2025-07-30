import Typography from "@/components/ui/Typography";
import Card from "@/components/ui/Card";
import {TechnologiesByCategory} from "@/lib/models/types/TechnologyCategory";
import technologyCategoryMetadata from "@/lib/constants/technologyCategoryMetadata";
import IconMap from "@/components/icons/IconMap";
import TypographyIcon from "@/components/ui/TypographyIcon";
import Label from "@/components/ui/Label";
import Image from "next/image";
import {Fragment} from "react";
import clsx from "clsx";

export default function ByTechnologiesCard(
    { technologies }: { technologies: TechnologiesByCategory[] }
) {
    return (
        <div>
            <Typography variant={"h3"} component={"h3"} className={"mb-2.5"}>
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
    const Icon = IconMap[categoryMetadata.icon];

    return (
        <div className={"mb-4"}>
            <div className={"mb-2 flex items-center gap-2"}>
                <TypographyIcon Icon={Icon} variant={"h3"} />
                <Typography variant={"h3"} component={"h4"}>
                    &nbsp;
                    {categoryMetadata.name}
                </Typography>
            </div>
            <ul className={"flex flex-wrap gap-2.5"}>
                {category.techs.map((tech) => (
                    <li key={tech.slug}>
                        <Label icon={
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