import {describe, beforeAll, it, expect} from "vitest";
import {experienceFixtures} from "@/lib/test-utils/fixtures/experience.fixtures";
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import {GET} from "./route";
import {NextResponse} from "next/server";
import {bindMockExperienceGetter, mockedExperienceGetter} from "@/lib/test-utils/mocks/ExperienceGetter.mocks";

describe("GET /api/experience", () => {
    beforeAll(async () => {
        await bindMockExperienceGetter();
    });

    it("returns experience data with 200 status when found", async () => {
        mockedExperienceGetter.getExperience.mockResolvedValue(experienceFixtures);

        const response = await GET();

        expect(container.get).toHaveBeenCalledWith(TYPES.ExperienceGetter);
        expect(mockedExperienceGetter.getExperience).toHaveBeenCalled();
        expect(response).toBeInstanceOf(NextResponse);

        const responseData = await response.json();
        expect(responseData).toEqual(experienceFixtures);
    });

    it("throws an error when unexpected error occurs", async () => {
        const error = new Error("Unexpected error");
        mockedExperienceGetter.getExperience.mockRejectedValue(error);

        await expect(GET()).rejects.toThrow(error);

        expect(container.get).toHaveBeenCalledWith(TYPES.ExperienceGetter);
        expect(mockedExperienceGetter.getExperience).toHaveBeenCalled();
    })
})