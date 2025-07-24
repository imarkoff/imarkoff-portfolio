import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProjectGetterImpl from '../ProjectGetterImpl';
import ProjectRepository from '@/lib/repositories/interfaces/ProjectRepository';
import Project from '@/lib/models/Project';
import projectFixtures from "@/lib/test-utils/fixtures/project.fixtures";

describe('ProjectGetterImpl', () => {
    let mockProjectRepository: ProjectRepository;
    let projectGetter: ProjectGetterImpl;

    const mockProjects: Project[] = projectFixtures;

    beforeEach(() => {
        mockProjectRepository = {
            getAllProjects: vi.fn(),
            getHomepageProjects: vi.fn(),
            getProjectById: vi.fn(),
            getProjectBySlug: vi.fn()
        };
        projectGetter = new ProjectGetterImpl(mockProjectRepository);
    });

    it('should return all projects from repository', async () => {
        (mockProjectRepository.getAllProjects as any).mockResolvedValue(mockProjects);

        const result = await projectGetter.getAllProjects();

        expect(mockProjectRepository.getAllProjects).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockProjects);
    });

    it('should propagate errors when getting all projects', async () => {
        const error = new Error('Repository error');
        (mockProjectRepository.getAllProjects as any).mockRejectedValue(error);

        await expect(projectGetter.getAllProjects()).rejects.toThrow('Repository error');
    });

    it('should return homepage projects from repository', async () => {
        const homepageProjects = [mockProjects[0]];
        (mockProjectRepository.getHomepageProjects as any).mockResolvedValue(homepageProjects);

        const result = await projectGetter.getHomepageProjects();

        expect(mockProjectRepository.getHomepageProjects).toHaveBeenCalledTimes(1);
        expect(result).toEqual(homepageProjects);
    });

    it('should return empty array when no homepage projects exist', async () => {
        (mockProjectRepository.getHomepageProjects as any).mockResolvedValue([]);

        const result = await projectGetter.getHomepageProjects();

        expect(result).toEqual([]);
    });

    it('should return project by id from repository', async () => {
        (mockProjectRepository.getProjectById as any).mockResolvedValue(mockProjects[0]);

        const result = await projectGetter.getProjectById('1');

        expect(mockProjectRepository.getProjectById).toHaveBeenCalledWith('1');
        expect(result).toEqual(mockProjects[0]);
    });

    it('should return null when project id not found', async () => {
        (mockProjectRepository.getProjectById as any).mockResolvedValue(null);

        const result = await projectGetter.getProjectById('999');

        expect(result).toBeNull();
    });

    it('should return project by slug from repository', async () => {
        (mockProjectRepository.getProjectBySlug as any).mockResolvedValue(mockProjects[1]);

        const result = await projectGetter.getProjectBySlug('project-2');

        expect(mockProjectRepository.getProjectBySlug).toHaveBeenCalledWith('project-2');
        expect(result).toEqual(mockProjects[1]);
    });

    it('should return null when project slug not found', async () => {
        (mockProjectRepository.getProjectBySlug as any).mockResolvedValue(null);

        const result = await projectGetter.getProjectBySlug('non-existent');

        expect(result).toBeNull();
    });
});