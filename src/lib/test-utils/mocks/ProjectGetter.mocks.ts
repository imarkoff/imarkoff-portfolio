import {Mocked, vi} from "vitest";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import projectFixtures from "@/lib/test-utils/fixtures/project.fixtures";
import ContainerBinder from "@/lib/test-utils/ContainerBinder";
import TYPES from "@/lib/di/types";

export const mockedProjectGetter: Mocked<ProjectGetter> = {
    getAllProjects: vi.fn(() => Promise.resolve(projectFixtures)),
    getHomepageProjects: vi.fn(() => Promise.resolve(projectFixtures.filter(p => p.shouldShowOnHomepage))),
    getProjectById: vi.fn(),
    getProjectBySlug: vi.fn()
};

export const bindMockProjectGetter = () => ContainerBinder.bindMockService(TYPES.ProjectGetter, mockedProjectGetter);