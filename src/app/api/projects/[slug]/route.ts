import TYPES from "@/lib/di/types";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import container from "@/lib/di/container";
import {NextResponse} from "next/server";

/**
 * API Route to get a project by its slug
 * @param slug - The unique identifier of the project
 * @return
 * * 200 - JSON response with the project data
 * * 404 - If the project is not found
 */
export async function GET(slug: string) {
    const service = container.get<ProjectGetter>(TYPES.ProjectGetter);

    const project = await service.getProjectById(slug);

    if (!project) {
        return new NextResponse("Project not found", { status: 404 });
    }

    return NextResponse.json(project);
}