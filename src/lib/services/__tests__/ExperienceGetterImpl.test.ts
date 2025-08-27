import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExperienceGetterImpl from '../ExperienceGetterImpl';
import ExperienceRepository from '@/lib/repositories/interfaces/ExperienceRepository';
import ExperienceType from '@/lib/models/types/ExperienceType';
import {experienceFixtures} from "@/lib/test-utils/fixtures/experience.fixtures";

describe('ExperienceGetterImpl', () => {
    let mockExperienceRepository: ExperienceRepository;
    let experienceGetter: ExperienceGetterImpl;

    const mockExperienceItems = experienceFixtures;

    beforeEach(() => {
        mockExperienceRepository = {
            getExperience: vi.fn()
        };
        experienceGetter = new ExperienceGetterImpl(mockExperienceRepository);
    });

    it('should call repository and return experience items', async () => {
        (mockExperienceRepository.getExperience as any).mockResolvedValue(mockExperienceItems);

        const result = await experienceGetter.getExperience();

        expect(mockExperienceRepository.getExperience).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockExperienceItems);
    });

    it('should propagate errors from the repository', async () => {
        const error = new Error('Repository error');
        (mockExperienceRepository.getExperience as any).mockRejectedValue(error);

        await expect(experienceGetter.getExperience()).rejects.toThrow('Repository error');
    });

    it('should group experience items by type', async () => {
        (mockExperienceRepository.getExperience as any).mockResolvedValue(mockExperienceItems);

        const result = await experienceGetter.getExperienceGroupedByType();

        expect(result[ExperienceType.Work]!.length).toBe(2);
        expect(result[ExperienceType.Education]!.length).toBe(1);
        expect(result[ExperienceType.Work]).toContainEqual(mockExperienceItems[0]);
        expect(result[ExperienceType.Work]).toContainEqual(mockExperienceItems[1]);
        expect(result[ExperienceType.Education]).toContainEqual(mockExperienceItems[2]);
    });

    it('should return empty object when no experience items exist', async () => {
        (mockExperienceRepository.getExperience as any).mockResolvedValue([]);

        const result = await experienceGetter.getExperienceGroupedByType();

        expect(Object.keys(result).length).toBe(0);
        expect(result).toEqual({});
    });
});