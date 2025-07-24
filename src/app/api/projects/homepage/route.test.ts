import {beforeAll, describe, it, expect} from "vitest";
import {bindMockProjectGetter, mockedProjectGetter} from "@/lib/test-utils/mocks/ProjectGetter.mocks";
import projectFixtures from "@/lib/test-utils/fixtures/project.fixtures";
import {GET} from "./route";

describe("GET /api/projects/homepage", () => {
    beforeAll(async () => {
        await bindMockProjectGetter();
    });

    it("should return projects for the homepage", async () => {
        const expectedProjects = projectFixtures.filter(project => project.shouldShowOnHomepage);
        mockedProjectGetter.getHomepageProjects.mockResolvedValue(expectedProjects);

        const response = await GET();
        const jsonResponse = await response.json();

        expect(mockedProjectGetter.getHomepageProjects).toHaveBeenCalledOnce();
        expect(response.status).toBe(200);
        expect(jsonResponse).toEqual(expectedProjects);
    });
});