import TYPES from "@/lib/di/types";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import container from "@/lib/di/container";
import {NextRequest, NextResponse} from "next/server";

/**
 * API Route to get a project by its slug
 * @return
 * * 200 - JSON response with the project data
 * * 404 - If the project is not found
 */
export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const service = container.get<ProjectGetter>(TYPES.ProjectGetter);

    const project = await service.getProjectBySlug(slug);

    if (!project) {
        return new NextResponse("Project not found", { status: 404 });
    }

    return NextResponse.json(project);
}