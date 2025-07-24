import container from "@/lib/di/container";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import TYPES from "@/lib/di/types";

/**
 * API Route to get all projects
 *
 * @returns
 * * 200: JSON response with all projects
 */
export async function GET() {
    const service = container.get<ProjectGetter>(TYPES.ProjectGetter);

    const projects = await service.getAllProjects();

    return Response.json(projects);
}