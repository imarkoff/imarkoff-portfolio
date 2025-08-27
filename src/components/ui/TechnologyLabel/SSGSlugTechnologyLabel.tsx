import TechnologyLabel, {TechnologyLabelProps} from "./TechnologyLabel";
import TechnologyGetter from "@/lib/services/interfaces/TechnologyGetter";
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";

export interface SlugTechnologyLabelProps extends Omit<TechnologyLabelProps, 'technology'> {
    /** The slug of the technology to fetch. */
    technologySlug: string;
}

/**
 * Fetches a technology by slug and renders it as TechnologyLabel.
 * Can be used in static generation only.
 */
export default async function SSGSlugTechnologyLabel(
    {technologySlug, ...props}: SlugTechnologyLabelProps
) {
    const technologyGetter = container.get<TechnologyGetter>(TYPES.TechnologyGetter);
    const technology = await technologyGetter.getTechnologyBySlug(technologySlug);

    if (!technology) {
        return null;
    }

    return (
        <TechnologyLabel technology={technology} {...props} />
    );
}