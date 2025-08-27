import {beforeEach, describe, expect, it, Mocked, vi} from "vitest";
import TechnologyGetterImpl from "../TechnologyGetterImpl";
import TechnologyRepository from "@/lib/repositories/interfaces/TechnologyRepository";
import Technology from "@/lib/models/Technology";
import TechnologyCategory, {TechnologiesSlugsByCategory} from "@/lib/models/types/TechnologyCategory";
import {technologyFixture} from "@/lib/test-utils/fixtures/technologyByCategoryFixtures";

const techFixture = (
    slug: string,
    category: TechnologyCategory = TechnologyCategory.Frontend
): Technology => ({
    ...technologyFixture,
    id: slug,
    name: slug,
    category,
    slug,
});

describe("TechnologyGetterImpl", () => {
    let technologyRepositoryMock: Mocked<TechnologyRepository>;
    let getter: TechnologyGetterImpl;

    beforeEach(() => {
        technologyRepositoryMock = {
            getAllTechnologies: vi.fn(),
            getTechnologyBySlug: vi.fn(),
            getTechnologiesBySlug: vi.fn(),
        } as any;
        getter = new TechnologyGetterImpl(technologyRepositoryMock);
    });

    it("returns all technologies from repository", async () => {
        const techs = [techFixture("react"), techFixture("node")];
        technologyRepositoryMock.getAllTechnologies.mockResolvedValue(techs);

        const result = await getter.getAllTechnologies();

        expect(result).toEqual(techs);
    });

    it("returns technology by slug", async () => {
        const tech = techFixture("react");
        technologyRepositoryMock.getTechnologyBySlug.mockResolvedValue(tech);

        const result = await getter.getTechnologyBySlug("react");

        expect(result).toBe(tech);
    });

    it("returns null if technology by slug not found", async () => {
        technologyRepositoryMock.getTechnologyBySlug.mockResolvedValue(null);

        const result = await getter.getTechnologyBySlug("unknown");

        expect(result).toBeNull();
    });

    it("returns technologies by slugs", async () => {
        const techs = [techFixture("react"), techFixture("node")];
        technologyRepositoryMock.getTechnologiesBySlug.mockResolvedValue(techs);

        const result = await getter.getTechnologiesBySlug(["react", "node"]);

        expect(result).toEqual(techs);
    });

    it("groups technologies by category and filters out missing slugs", async () => {
        const allTechs = [
            techFixture("react", TechnologyCategory.Frontend),
            techFixture("node", TechnologyCategory.Backend),
        ];
        technologyRepositoryMock.getAllTechnologies.mockResolvedValue(allTechs);

        const slugsByCategories: TechnologiesSlugsByCategory[] = [
            { categoryName: TechnologyCategory.Frontend, techs: ["react", "vue"] },
            { categoryName: TechnologyCategory.Backend, techs: ["node"] },
        ];

        const result = await getter.getTechnologiesBySlugGroupedByCategory(slugsByCategories);

        expect(result).toEqual([
            { categoryName: "frontend", techs: [allTechs[0]] },
            { categoryName: "backend", techs: [allTechs[1]] },
        ]);
    });

    it("returns empty techs array for categories with no matching slugs", async () => {
        technologyRepositoryMock.getAllTechnologies.mockResolvedValue([]);

        const slugsByCategories: TechnologiesSlugsByCategory[] = [
            { categoryName: TechnologyCategory.Frontend, techs: ["react"] },
        ];

        const result = await getter.getTechnologiesBySlugGroupedByCategory(slugsByCategories);

        expect(result).toEqual([
            { categoryName: TechnologyCategory.Frontend, techs: [] },
        ]);
    });
});