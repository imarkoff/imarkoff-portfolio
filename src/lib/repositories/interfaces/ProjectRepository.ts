import Project from "@/lib/models/Project";

/**
 * ProjectRepository defines the interface for project-related data operations.
 * It provides methods to retrieve project data from a data source.
 */
export default interface ProjectRepository {
    /**
     * Retrieves all projects.
     * @returns A promise that resolves to an array of Project objects.
     */
    getAllProjects(): Promise<Project[]>;

    /**
     * Retrieves projects that should be displayed on the homepage.
     * @returns A promise that resolves to an array of Project objects.
     */
    getHomepageProjects(): Promise<Project[]>;

    /**
     * Retrieves a project by its ID.
     * @param id - The unique identifier of the project.
     * @returns A promise that resolves to a Project object or null if not found.
     */
    getProjectById(id: string): Promise<Project | null>;

    /**
     * Retrieves a project by its slug.
     * This is useful for SEO-friendly URLs.
     * @param slug - The slug of the project, typically a URL-friendly version of the project name.
     * @return A promise that resolves to a Project object or null if not found.
     */
    getProjectBySlug(slug: string): Promise<Project | null>;
}