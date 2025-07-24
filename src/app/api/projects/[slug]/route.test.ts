import {beforeAll, describe, it, expect} from "vitest";
import {bindMockProjectGetter, mockedProjectGetter} from "@/lib/test-utils/mocks/ProjectGetter.mocks";
import projectFixtures from "@/lib/test-utils/fixtures/project.fixtures";
import { GET } from "./route";
import {NextRequest} from "next/server";

describe("GET /api/projects/[slug]", () => {
    beforeAll(async () => {
        await bindMockProjectGetter();
    })

    it("should return a project by slug", async () => {
        const expectedProject = projectFixtures[0];
        mockedProjectGetter.getProjectBySlug.mockResolvedValue(expectedProject);
        const params = Promise.resolve({ slug: "existing-slug" });

        const response = await GET(undefined as unknown as NextRequest, { params });
        const data = await response.json();

        expect(mockedProjectGetter.getProjectBySlug).toBeCalledWith((await params).slug);
        expect(response.status).toBe(200);
        expect(data).toEqual(expectedProject);
    })

    it ("should return 404 if project not found", async () => {
        mockedProjectGetter.getProjectBySlug.mockResolvedValue(null);
        const params = Promise.resolve({ slug: "non-existing-slug" });

        const response = await GET(undefined as unknown as NextRequest, { params });

        expect(mockedProjectGetter.getProjectBySlug).toBeCalledWith((await params).slug);
        expect(response.status).toBe(404);
        expect(await response.text()).toBeTruthy();
    });
});