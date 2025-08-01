import {inject, injectable} from "inversify";
import type TechnologyRepository from "@/lib/repositories/interfaces/TechnologyRepository";
import TechnologyGetter from "@/lib/services/interfaces/TechnologyGetter";
import TYPES from "@/lib/di/types";
import Technology from "@/lib/models/Technology";
import TechnologyCategory, {TechnologiesSlugsByCategory} from "@/lib/models/types/TechnologyCategory";

@injectable()
export default class TechnologyGetterImpl implements TechnologyGetter {
    constructor(
        @inject(TYPES.TechnologyRepository) private technologyRepository: TechnologyRepository
    ) {
    }

    async getAllTechnologies(): Promise<Technology[]> {
        return this.technologyRepository.getAllTechnologies();
    }

    async getTechnologyBySlug(slug: string): Promise<Technology | null> {
        return this.technologyRepository.getTechnologyBySlug(slug);
    }

    async getTechnologiesBySlug(slugs: string[]): Promise<Technology[]> {
        return this.technologyRepository.getTechnologiesBySlug(slugs);
    }

    async getTechnologiesBySlugGroupedByCategory(slugsByCategories: TechnologiesSlugsByCategory[]) {
        const allTechnologies = await this.getAllTechnologies();

        const techMap = new Map(allTechnologies.map(tech => [tech.slug, tech]));

        return slugsByCategories.map(({categoryName, techs}) => ({
            categoryName: categoryName as TechnologyCategory,
            techs: techs
                .map(slug => techMap.get(slug))
                .filter((tech): tech is Technology => tech !== undefined)
        }));
    }
}