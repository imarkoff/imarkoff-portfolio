import getTechnologyBySlugApi from "@/lib/api/technologies/getTechnologyBySlugApi";
import TechnologyLabel, {TechnologyLabelProps} from "./TechnologyLabel";

export interface SlugTechnologyLabelProps extends Omit<TechnologyLabelProps, 'technology'> {
    technologySlug: string;
}

export default async function SlugTechnologyLabel(
    {technologySlug, ...props}: SlugTechnologyLabelProps
) {
    const technology = await getTechnologyBySlugApi(technologySlug);

    if (!technology) {
        return null;
    }

    return (
        <TechnologyLabel technology={technology} {...props} />
    );
}