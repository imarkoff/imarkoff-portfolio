import type ContactRequestRepository from "@/lib/repositories/interfaces/ContactRequestRepository";
import {inject, injectable} from "inversify";
import TYPES from "../di/types";
import ContactRequest from "@/lib/models/ContactRequest";
import ContactRequestDto from "@/lib/dto/ContactRequestDto";
import {ValidationError} from "@/lib/errors/errors";
import ContactRequestService from "@/lib/services/interfaces/ContactRequestService";

@injectable()
export default class ContactRequestServiceImpl implements ContactRequestService {
    constructor(
        @inject(TYPES.ContactRequestRepository)
        private contactRequestRepository: ContactRequestRepository
    ) {
    }

    async createContactRequest(contactRequest: ContactRequestDto): Promise<ContactRequest> {
        const result = ContactRequestDto.safeParse(contactRequest);
        if (!result.success) {
            throw new ValidationError(result.error.message);
        }

        const contactRequestData: ContactRequest = {
            ...result.data,
        };

        return await this.contactRequestRepository.createContactRequest(contactRequestData);
    }
}