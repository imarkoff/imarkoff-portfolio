import ContactRequest from "@/lib/models/ContactRequest";

export default interface ContactRequestRepository {
    /**
     * Create a new contact request.
     * @param contactRequest - The contact request to create.
     * @return A promise that resolves to the created contact request.
     */
    createContactRequest(contactRequest: ContactRequest): Promise<ContactRequest>;
}