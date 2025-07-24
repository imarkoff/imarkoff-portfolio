import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import {NextResponse} from "next/server";

/**
 * API Route to get the experience section
 * @return
 * * 200 - JSON response with the experience data
 */
export async function GET() {
    const service = container.get<ExperienceGetter>(TYPES.ExperienceGetter);

    const experience = await service.getExperience();

    return NextResponse.json(experience);
}