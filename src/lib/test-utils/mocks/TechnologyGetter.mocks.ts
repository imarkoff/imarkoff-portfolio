import TechnologyGetter from "@/lib/services/interfaces/TechnologyGetter";
import {vi, Mocked} from "vitest";
import TYPES from "@/lib/di/types";
import ContainerBinder from "@/lib/test-utils/ContainerBinder";

export const mockedTechnologyGetter: Mocked<TechnologyGetter> = {
    getAllTechnologies: vi.fn(),
    getTechnologyBySlug: vi.fn(),
    getTechnologiesBySlug: vi.fn(),
    getTechnologiesBySlugGroupedByCategory: vi.fn()
}

export const bindMockTechnologyGetter = () => ContainerBinder.bindMockService(TYPES.TechnologyGetter, mockedTechnologyGetter);