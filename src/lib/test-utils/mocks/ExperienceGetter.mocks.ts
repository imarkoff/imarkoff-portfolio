import {Mocked, vi} from "vitest";
import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import TYPES from "@/lib/di/types";
import ContainerBinder from "@/lib/test-utils/ContainerBinder";

export const mockedExperienceGetter: Mocked<ExperienceGetter> = {
    getExperience: vi.fn(),
    getExperienceGroupedByType: vi.fn()
};

export const bindMockExperienceGetter = () => ContainerBinder.bindMockService(TYPES.ExperienceGetter, mockedExperienceGetter);