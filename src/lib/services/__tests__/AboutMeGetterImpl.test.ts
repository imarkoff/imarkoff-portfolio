import {describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import AboutMeGetterImpl from '../AboutMeGetterImpl';
import aboutMeFixture from "@/lib/test-utils/fixtures/aboutMe.fixtures";
import AboutMeRepository from "@/lib/repositories/interfaces/AboutMeRepository";

describe('AboutMeGetterImpl', () => {
    let mockAboutMeRepository: AboutMeRepository & { getAboutMe: Mock };
    let aboutMeGetter: AboutMeGetterImpl;
    const sampleAboutMe = aboutMeFixture;

    beforeEach(() => {
        mockAboutMeRepository = {
            getAboutMe: vi.fn()
        };
        aboutMeGetter = new AboutMeGetterImpl(mockAboutMeRepository);
    });

    it('should call repository and return AboutMe data', async () => {
        mockAboutMeRepository.getAboutMe.mockResolvedValue(sampleAboutMe);

        const result = await aboutMeGetter.getAboutMe();

        expect(mockAboutMeRepository.getAboutMe).toHaveBeenCalledTimes(1);
        expect(result).toEqual(sampleAboutMe);
    });

    it('should propagate errors from the repository', async () => {
        const error = new Error('Repository error');
        mockAboutMeRepository.getAboutMe.mockRejectedValue(error);

        await expect(aboutMeGetter.getAboutMe()).rejects.toThrow('Repository error');
    });
});