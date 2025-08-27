import getTechnologyBySlugApi from "@/lib/api/technologies/getTechnologyBySlugApi";
import TechnologyLabel, {TechnologyLabelProps} from "./TechnologyLabel";

export interface SlugTechnologyLabelProps extends Omit<TechnologyLabelProps, 'technology'> {
    /** The slug of the technology to fetch. */
    technologySlug: string;
}

/**
 * Fetches a technology by slug and renders it as TechnologyLabel.
 * Can be used only as Server Component
 */
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