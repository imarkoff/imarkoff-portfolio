import ContactRequestRepository from "./interfaces/ContactRequestRepository";
import {inject, injectable} from "inversify";
import TYPES from "@/lib/di/types";
import ContactRequest from "../models/ContactRequest";
import {FirebaseCollections} from "@/lib/database/collections";

@injectable()
export default class FirestoreContactRequestRepository implements ContactRequestRepository {
    constructor(
        @inject(TYPES.Firestore) private firestore: FirebaseFirestore.Firestore
    ) {
    }

    async createContactRequest(contactRequest: ContactRequest): Promise<ContactRequest> {
        const contactRequestRef = this.firestore
            .collection(FirebaseCollections.ContactRequests)
            .doc();

        const newContactRequest: ContactRequest = {
            ...contactRequest,
            id: contactRequestRef.id,
            createdAt: new Date().toISOString()
        };

        await contactRequestRef.set(newContactRequest);

        return newContactRequest;
    }
}