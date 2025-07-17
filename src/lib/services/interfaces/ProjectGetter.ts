import Project from "@/lib/models/Project";

/**
 * Service interface for fetching project data.
 */
export default interface ProjectGetter {
    /**
     * Fetches a project by its ID.
     * @param id - The unique identifier of the project.
     * @returns A promise that resolves to the project object or null if not found.
     */
    getProjectById(id: string): Promise<Project | null>;

    /**
     * Fetches all projects, optionally filtered by type.
     * @param type - Optional filter for project type.
     * @returns A promise that resolves to an array of projects.
     */
    getAllProjects(type?: string): Promise<Project[]>;

    /**
     * Fetches projects that should be displayed on the homepage.
     * @returns A promise that resolves to an array of projects.
     */
    getHomepageProjects(): Promise<Project[]>;
}