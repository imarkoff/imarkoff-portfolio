import {beforeAll, describe, it, expect} from "vitest";
import {bindMockExperienceGetter, mockedExperienceGetter} from "@/lib/test-utils/mocks/ExperienceGetter.mocks";
import { GET } from './route';
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import {NextResponse} from "next/server";
import {groupedExperienceFixtures} from "@/lib/test-utils/fixtures/experience.fixtures";

describe('GET /api/experience/grouped-by-type', () => {
    beforeAll(async () => {
        await bindMockExperienceGetter();
    });

    it('gets container with ExperienceGetter', async () => {
        mockedExperienceGetter.getExperienceGroupedByType.mockResolvedValue(groupedExperienceFixtures);

        await GET();

        expect(container.get).toHaveBeenCalledWith(TYPES.ExperienceGetter);
    });

    it('returns grouped experience data with 200 status when found', async () => {
        mockedExperienceGetter.getExperienceGroupedByType.mockResolvedValue(groupedExperienceFixtures);

        const response = await GET();

        expect(mockedExperienceGetter.getExperienceGroupedByType).toHaveBeenCalled();
        expect(response).toBeInstanceOf(NextResponse);

        const responseData = await response.json();
        expect(responseData).toEqual(groupedExperienceFixtures);
    });
});