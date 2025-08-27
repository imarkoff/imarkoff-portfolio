import {vi, describe, beforeEach, it, expect, Mocked} from "vitest";
import ShowcaseGetterImpl from '../ShowcaseGetterImpl';
import ShowcaseRepository from "@/lib/repositories/interfaces/ShowcaseRepository";
import ShowcaseImage from "@/lib/models/ShowcaseImage";
import {showcaseImageFixture} from "@/lib/test-utils/fixtures/showcaseImage.fixtures";

describe('ShowcaseGetterImpl', () => {
    let showcaseRepositoryMock: Mocked<ShowcaseRepository>;
    let getter: ShowcaseGetterImpl;

    beforeEach(() => {
        showcaseRepositoryMock = { getShowcaseImages: vi.fn() };
        getter = new ShowcaseGetterImpl(showcaseRepositoryMock);
    });

    it('returns images grouped by column and ordered by orderIndex', async () => {
        const images: ShowcaseImage[] = [
            { ...showcaseImageFixture, columnIndex: 0, orderIndex: 0 },
            { ...showcaseImageFixture, columnIndex: 1, orderIndex: 0 },
            { ...showcaseImageFixture, columnIndex: 0, orderIndex: 1 },
            { ...showcaseImageFixture, columnIndex: 1, orderIndex: 1 },
        ];
        showcaseRepositoryMock.getShowcaseImages.mockResolvedValue(images);

        const result = await getter.getShowcases();

        expect(result).toEqual([
            [images[0], images[2]],
            [images[1], images[3]],
        ]);
    });

    it('returns an empty array when there are no images', async () => {
        showcaseRepositoryMock.getShowcaseImages.mockResolvedValue([]);

        const result = await getter.getShowcases();

        expect(result).toEqual([]);
    });

    it('handles missing columns and sparse orderIndexes', async () => {
        const images = [
            { ...showcaseImageFixture, columnIndex: 2, orderIndex: 0 },
            { ...showcaseImageFixture, columnIndex: 2, orderIndex: 2 },
            { ...showcaseImageFixture, columnIndex: 0, orderIndex: 1 },
        ];
        showcaseRepositoryMock.getShowcaseImages.mockResolvedValue(images);

        const result = await getter.getShowcases();

        expect(result[0][1]).toBe(images[2]);
        expect(result[2][0]).toBe(images[0]);
        expect(result[2][2]).toBe(images[1]);
    });

    it('handles images with the same columnIndex and orderIndex (last one wins)', async () => {
        const images = [
            { ...showcaseImageFixture, columnIndex: 0, orderIndex: 0 },
            { ...showcaseImageFixture, columnIndex: 0, orderIndex: 0, id: "2" }
        ];
        showcaseRepositoryMock.getShowcaseImages.mockResolvedValue(images);

        const result = await getter.getShowcases();

        expect(result[0][0]).toBe(images[1]);
    });
});