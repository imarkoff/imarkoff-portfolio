import {beforeAll, describe, it, expect} from "vitest";
import {bindMockProjectGetter, mockedProjectGetter} from "@/lib/test-utils/mocks/ProjectGetter.mocks";
import { GET } from "./route";
import projectFixtures from "@/lib/test-utils/fixtures/project.fixtures";

describe("GET /api/projects", () => {
    beforeAll(async () => {
        await bindMockProjectGetter();
    })

    it("should return all projects", async () => {
        mockedProjectGetter.getAllProjects.mockResolvedValue(projectFixtures);

        const response = await GET();
        const data = await response.json();

        expect(mockedProjectGetter.getAllProjects).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(data).toEqual(projectFixtures);
    });
})