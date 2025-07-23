import Project from "@/lib/models/Project";

/**
 * Service interface for fetching project data.
 */
export default interface ProjectGetter {
    /**
     * Fetches all projects, optionally filtered by type.
     * @returns A promise that resolves to an array of projects.
     */
    getAllProjects(): Promise<Project[]>;

    /**
     * Fetches projects that should be displayed on the homepage.
     * @returns A promise that resolves to an array of projects.
     */
    getHomepageProjects(): Promise<Project[]>;

    /**
     * Fetches a project by its ID.
     * @param id - The unique identifier of the project.
     * @returns A promise that resolves to the project object or null if not found.
     */
    getProjectById(id: string): Promise<Project | null>;

    /**
     * Fetches a project by its slug.
     * @param slug - The unique slug of the project.
     * @returns A promise that resolves to the project object or null if not found.
     */
    getProjectBySlug(slug: string): Promise<Project | null>;
}