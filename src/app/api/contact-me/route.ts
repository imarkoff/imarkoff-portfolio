import {NextRequest, NextResponse} from "next/server";
import container from "@/lib/di/container";
import TYPES from "@/lib/di/types";
import ContactRequestService from "@/lib/services/interfaces/ContactRequestService";
import {ValidationError} from "@/lib/errors/errors";

/**
 * Handles POST requests to create a new contact request.
 * @returns
 * * 201 - Contact request created successfully.
 * * 400 - Validation error if the request data is invalid.
 */
export async function POST(request: NextRequest) {
    const contactRequestService = container.get<ContactRequestService>(TYPES.ContactRequestService);

    const contactRequestData = await request.json();

    try {
        const contactRequest = await contactRequestService.createContactRequest(contactRequestData);
        return NextResponse.json(contactRequest, {status: 201});
    } catch (error) {
        if (error instanceof ValidationError) {
            return NextResponse.json({message: error.message}, {status: 400});
        }

        throw error;
    }
}