import {inject, injectable} from "inversify";
import TYPES from "@/lib/di/types";
import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";
import type ShowcaseRepository from "@/lib/repositories/interfaces/ShowcaseRepository";
import ShowcaseImage from "../models/ShowcaseImage";

@injectable()
export default class ShowcaseGetterImpl implements ShowcaseGetter {
    constructor(
        @inject(TYPES.ShowcaseRepository) private showcaseRepository: ShowcaseRepository,
    ) {
    }

    async getShowcases(): Promise<Array<ShowcaseImage[]>> {
        const images = await this.showcaseRepository.getShowcaseImages();

        const columns: Array<ShowcaseImage[]> = [];

        images.forEach(image => {
            if (!columns[image.columnIndex]) {
                columns[image.columnIndex] = [];
            }
            columns[image.columnIndex][image.orderIndex] = image;
        });

        return columns;
    }
}