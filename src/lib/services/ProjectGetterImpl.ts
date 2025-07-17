import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import {inject, injectable} from "inversify";
import type ProjectRepository from "@/lib/repositories/interfaces/ProjectRepository";
import Project from "@/lib/models/Project";
import TYPES from "@/lib/di/types";

@injectable()
export default class ProjectGetterImpl implements ProjectGetter {
    private projectRepository: ProjectRepository;

    constructor(
        @inject(TYPES.ProjectRepository) projectRepository: ProjectRepository
    ) {
        this.projectRepository = projectRepository;
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.getAllProjects();
    }

    async getHomepageProjects(): Promise<Project[]> {
        return this.projectRepository.getHomepageProjects();
    }

    async getProjectById(id: string): Promise<Project | null> {
        return this.projectRepository.getProjectById(id);
    }
}