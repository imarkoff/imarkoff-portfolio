import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import {Mocked, vi} from "vitest";
import ContainerBinder from "@/lib/test-utils/ContainerBinder";
import TYPES from "@/lib/di/types";

export const mockedAboutMeGetter: Mocked<AboutMeGetter> = {
    getAboutMe: vi.fn()
};

export const bindMockAboutMeGetter = () => ContainerBinder.bindMockService(TYPES.AboutMeGetter, mockedAboutMeGetter);