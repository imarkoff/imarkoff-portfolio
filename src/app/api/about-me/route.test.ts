import {describe, it, expect, vi, beforeEach, beforeAll} from 'vitest';
import { GET } from './route';
import { NextResponse } from 'next/server';
import { NotFoundError } from '@/lib/errors/errors';
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
import {mockedAboutMeGetter, bindMockAboutMeGetter} from "@/lib/test-utils/mocks/AboutMeGetter.mocks";

describe('GET /api/about-me', () => {
    beforeAll(async () => {
        await bindMockAboutMeGetter();
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns about me data with 200 status when found', async () => {
        mockedAboutMeGetter.getAboutMe.mockResolvedValue(aboutMeFixture);

        const response = await GET();

        expect(mockedAboutMeGetter.getAboutMe).toHaveBeenCalled();
        expect(response).toBeInstanceOf(NextResponse);

        const responseData = await response.json();
        expect(responseData).toEqual(aboutMeFixture);
    });

    it('returns 404 response when about me data not found', async () => {
        mockedAboutMeGetter.getAboutMe.mockRejectedValue(new NotFoundError('About Me not found'));

        const response = await GET();

        expect(mockedAboutMeGetter.getAboutMe).toHaveBeenCalled();
        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(404);

        const responseText = await response.text();
        expect(responseText).toBe('About Me not found');
    });

    it('propagates unexpected errors', async () => {
        const error = new Error('Unexpected error');
        mockedAboutMeGetter.getAboutMe.mockRejectedValue(error);

        await expect(GET()).rejects.toThrow(error);

        expect(mockedAboutMeGetter.getAboutMe).toHaveBeenCalled();
    });
});