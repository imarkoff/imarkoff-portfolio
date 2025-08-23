import ContactRequestDto from "@/lib/dto/ContactRequestDto";
import ContactRequest from "@/lib/models/ContactRequest";

export default interface ContactRequestService {
    /**
     * Create a new contact request.
     * @param contactRequestDto - The contact request data transfer object containing the details of the request.
     * @return A promise that resolves to the created contact request.
     * @throws {ValidationError} If the contact request data is invalid.
     * @throws {Error} If there is an error during the creation process.
     */
    createContactRequest(contactRequestDto: ContactRequestDto): Promise<ContactRequest>;
}