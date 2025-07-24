import container from "@/lib/di/container";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import TYPES from "@/lib/di/types";
import {NextResponse} from "next/server";

/**
 * API Route to get projects for the homepage
 *
 * @returns
 * * 200: JSON response with projects
 */
export async function GET() {
    const service = container.get<ProjectGetter>(TYPES.ProjectGetter);

    const projects = await service.getHomepageProjects();

    return NextResponse.json(projects);
}