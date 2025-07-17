import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import {inject, injectable} from "inversify";
import AboutMe from "@/lib/models/AboutMe";
import type AboutMeRepository from "@/lib/repositories/interfaces/AboutMeRepository";
import TYPES from "@/lib/di/types";

@injectable()
export default class AboutMeGetterImpl implements AboutMeGetter {
    constructor(
        @inject(TYPES.AboutMeRepository) private aboutMeRepository: AboutMeRepository
    ) {
    }

    async getAboutMe(): Promise<AboutMe> {
        return this.aboutMeRepository.getAboutMe();
    }
}