import { NextRequest } from "next/server";
import {describe, it, expect, beforeAll} from "vitest";
import { GET } from "./route";
import {bindMockTechnologyGetter, mockedTechnologyGetter} from "@/lib/test-utils/mocks/TechnologyGetter.mocks";
import {technologyFixture} from "@/lib/test-utils/fixtures/technologyByCategoryFixtures";

const mockedRequest = new NextRequest("https://exampe.com/api/technologies/existing-slug");

describe("GET /api/technologies/[slug]", () => {
  beforeAll(() => {
    bindMockTechnologyGetter();
  });

  it("should return a technology when found", async () => {
    const slug = "existing-slug";
    const expectedTechnology = technologyFixture;
    mockedTechnologyGetter.getTechnologyBySlug.mockResolvedValue(expectedTechnology);

    const response = await GET(mockedRequest, { params: Promise.resolve({ slug }) });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(expectedTechnology);
  });

  it("should return a 404 response when technology is not found", async () => {
    const slug = "nonexistent-slug";
    mockedTechnologyGetter.getTechnologyBySlug.mockResolvedValue(null);

    const response = await GET(mockedRequest, { params: Promise.resolve({ slug }) });

    expect(response.status).toBe(404);
    expect(await response.text()).toEqual("Technology not found");
  });

  it("should throw an error if mockedTechnologyGetter.getTechnologyBySlug throws an error", async () => {
    const slug = "existing-slug";
    const error = new Error("An error occurred");
    mockedTechnologyGetter.getTechnologyBySlug.mockRejectedValue(error);

    await expect(() =>
        GET(mockedRequest, { params: Promise.resolve({ slug }) })
    ).rejects.toThrowError(error);
  });
});