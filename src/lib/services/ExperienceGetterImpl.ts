import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import {inject, injectable} from "inversify";
import TYPES from "@/lib/di/types";
import type ExperienceRepository from "@/lib/repositories/interfaces/ExperienceRepository";
import ExperienceItem from "../models/ExperienceItem";
import ExperienceType from "@/lib/models/types/ExperienceType";

@injectable()
export default class ExperienceGetterImpl implements ExperienceGetter {
    constructor(
        @inject(TYPES.ExperienceRepository) private experienceRepository: ExperienceRepository
    ) {
    }

    getExperience(): Promise<ExperienceItem[]> {
        return this.experienceRepository.getExperience();
    }
    async getExperienceGroupedByType(): Promise<Record<ExperienceType, ExperienceItem[]>> {
        const experienceItems = await this.getExperience();

        return experienceItems.reduce((acc, item) => {
            const type = item.type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(item);
            return acc;
        }, {} as Record<ExperienceType, ExperienceItem[]>);
    }
}