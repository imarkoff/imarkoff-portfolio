import {vi, describe, it, beforeEach, expect, beforeAll} from "vitest";
import { render } from "@testing-library/react";
import SSGSlugTechnologyLabel from "../SSGSlugTechnologyLabel";
import TechnologyLabel from "../TechnologyLabel";
import {technologyFixture} from "@/lib/test-utils/fixtures/technologyByCategoryFixtures";
import {bindMockTechnologyGetter, mockedTechnologyGetter} from "@/lib/test-utils/mocks/TechnologyGetter.mocks";

vi.mock("@/lib/api/technologies/getTechnologyBySlugApi", () => ({
    default: vi.fn(),
}));

vi.mock("../TechnologyLabel", () => ({
    default: vi.fn(),
}));

describe("SSGSlugTechnologyLabel", () => {
    beforeAll(() => {
        bindMockTechnologyGetter();
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render TechnologyLabel with fetched technology", async () => {
        const mockTechnology = { ...technologyFixture, slug: "react" };
        mockedTechnologyGetter.getTechnologyBySlug.mockResolvedValue(mockTechnology);

        render(await SSGSlugTechnologyLabel({ technologySlug: "react" }));

        expect(TechnologyLabel).toHaveBeenCalledWith(
            expect.objectContaining({ technology: mockTechnology }),
            undefined
        );
    });

    it("should return null when technology is not found", async () => {
        mockedTechnologyGetter.getTechnologyBySlug.mockResolvedValue(null);

        render(await SSGSlugTechnologyLabel({ technologySlug: "nonexistent" }));

        expect(TechnologyLabel).not.toHaveBeenCalled();
    });

    it("should throw error if API call fails", async () => {
        mockedTechnologyGetter.getTechnologyBySlug.mockRejectedValue(new Error("API error"));

        await expect(async () => {
            render(await SSGSlugTechnologyLabel({ technologySlug: "error" }))
        }).rejects.toThrow("API error");
    });
});