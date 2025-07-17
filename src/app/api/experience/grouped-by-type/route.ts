import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import {NextResponse} from "next/server";

/**
 * API Route to get the experience section grouped by type
 * @return
 * * 200 - JSON response with the grouped experience data
 */
export async function GET() {
    const service = container.get<ExperienceGetter>(TYPES.ExperienceGetter);

    const groupedExperience = await service.getExperienceGroupedByType();

    return NextResponse.json(groupedExperience);
}