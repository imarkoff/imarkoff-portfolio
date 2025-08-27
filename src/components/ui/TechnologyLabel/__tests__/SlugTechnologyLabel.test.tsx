import { vi, describe, it, beforeEach, expect } from "vitest";
import { render } from "@testing-library/react";
import SlugTechnologyLabel from "../SlugTechnologyLabel";
import TechnologyLabel from "../TechnologyLabel";
import getTechnologyBySlugApi from "@/lib/api/technologies/getTechnologyBySlugApi";
import {technologyFixture} from "@/lib/test-utils/fixtures/technologyByCategoryFixtures";

vi.mock("@/lib/api/technologies/getTechnologyBySlugApi", () => ({
    default: vi.fn(),
}));

vi.mock("../TechnologyLabel", () => ({
    default: vi.fn(),
}));

describe("SlugTechnologyLabel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render TechnologyLabel with fetched technology", async () => {
        const mockTechnology = { ...technologyFixture, slug: "react" };
        vi.mocked(getTechnologyBySlugApi).mockResolvedValue(mockTechnology);

        render(await SlugTechnologyLabel({ technologySlug: "react" }));

        expect(TechnologyLabel).toHaveBeenCalledWith(
            expect.objectContaining({ technology: mockTechnology }),
            undefined
        );
    });

    it("should return null when technology is not found", async () => {
        vi.mocked(getTechnologyBySlugApi).mockResolvedValue(null);

        render(await SlugTechnologyLabel({ technologySlug: "nonexistent" }));

        expect(TechnologyLabel).not.toHaveBeenCalled();
    });

    it("should throw error if API call fails", async () => {
        vi.mocked(getTechnologyBySlugApi).mockRejectedValue(new Error("API error"));

        await expect(async () => {
            render(await SlugTechnologyLabel({ technologySlug: "error" }))
        }).rejects.toThrow("API error");
    });
});