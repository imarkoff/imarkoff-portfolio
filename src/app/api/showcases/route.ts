import { NextResponse } from "next/server";
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";

/**
 * Gets all showcase images.
 * 
 * @returns
 * * 200: JSON response with all showcase images
 */
export async function GET() {
    const showcaseGetter = container.get<ShowcaseGetter>(TYPES.ShowcaseGetter);

    const projects = await showcaseGetter.getShowcases();

    return NextResponse.json(projects);
}