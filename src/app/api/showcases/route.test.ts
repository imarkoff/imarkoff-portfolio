import {describe, it, expect, beforeAll} from "vitest";
import { GET } from "@/app/api/showcases/route";
import {bindMockShowcaseGetter, mockedShowcaseGetter} from "@/lib/test-utils/mocks/ShowcaseGetter.mocks";
import {showcaseImageMatrixFixture} from "@/lib/test-utils/fixtures/showcaseImage.fixtures";

describe("GET /api/showcases", () => {
  beforeAll(() => {
    bindMockShowcaseGetter();
  });

  it("should return showcase images when showcaseGetter.getShowcases is successful", async () => {
    const expectedShowcases = showcaseImageMatrixFixture;
    mockedShowcaseGetter.getShowcases.mockResolvedValue(expectedShowcases);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(expectedShowcases);
  });

  it("should handle errors from showcaseGetter.getShowcases", async () => {
    const error = new Error("Failed to get showcases");
    mockedShowcaseGetter.getShowcases.mockRejectedValue(error);

    await expect(GET).rejects.toThrowError(error);
  });
});