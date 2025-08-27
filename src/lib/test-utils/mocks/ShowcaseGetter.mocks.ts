import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";
import {vi, Mocked} from "vitest";
import ContainerBinder from "@/lib/test-utils/ContainerBinder";
import TYPES from "@/lib/di/types";

export const mockedShowcaseGetter: Mocked<ShowcaseGetter> = {
    getShowcases: vi.fn()
}

export const bindMockShowcaseGetter = () => ContainerBinder.bindMockService(TYPES.ShowcaseGetter, mockedShowcaseGetter);