import {TechnologiesByCategory, TechnologiesSlugsByCategory} from "@/lib/models/types/TechnologyCategory";
import Technology from "@/lib/models/Technology";

export default interface TechnologyGetter {
    /**
     * Fetches all technologies registered in the system.
     * @return A list of all technologies.
     */
    getAllTechnologies(): Promise<Technology[]>;

    /**
     * Fetches a technology by its unique slug.
     * @param slug The unique slug of the technology.
     * @return The technology object if found, otherwise null.
     */
    getTechnologyBySlug(slug: string): Promise<Technology | null>;

    /**
     * Fetches multiple technologies by their unique slugs.
     * @param slugs An array of unique slugs for the technologies.
     * @return A list of technology objects corresponding to the provided slugs.
     */
    getTechnologiesBySlug(slugs: string[]): Promise<Technology[]>;

    /**
     * Fetches technologies grouped by categories based on the provided slugs.
     * @param slugsByCategory An object mapping technology categories to their respective slugs.
     * @return An object containing technologies grouped by their categories.
     */
    getTechnologiesBySlugGroupedByCategory(slugsByCategory: TechnologiesSlugsByCategory[]): Promise<TechnologiesByCategory[]>;
}