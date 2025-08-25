import { NextRequest, NextResponse } from "next/server";
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import TechnologyGetter from "@/lib/services/interfaces/TechnologyGetter";

/**
 * Get a single technology by slug.
 * @returns 
 * * 200: An object representing the technology
 * * 404: A message indicating that the technology was not found
 */
export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const technologyGetter = container.get<TechnologyGetter>(TYPES.TechnologyGetter);

    const technology = await technologyGetter.getTechnologyBySlug(slug);

    if (!technology) {
        return new NextResponse("Technology not found", { status: 404 });
    }

    return NextResponse.json(technology);
}