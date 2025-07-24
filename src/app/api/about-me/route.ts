import container from "@/lib/di/container";
import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import TYPES from "@/lib/di/types";
import {NextResponse} from "next/server";
import {NotFoundError} from "@/lib/errors/errors";

/**
 * API Route to get the "About Me" section
 * @return
 * * 200 - JSON response with the "About Me" data
 * * 404 - If the "About Me" section is not found
 */
export async function GET() {
    const service = container.get<AboutMeGetter>(TYPES.AboutMeGetter);

    try {
        const aboutMe = await service.getAboutMe();

        return NextResponse.json(aboutMe);
    }
    catch (error) {
        if (error instanceof NotFoundError) {
            return new NextResponse("About Me not found", { status: 404 });
        }
        throw error;
    }
}