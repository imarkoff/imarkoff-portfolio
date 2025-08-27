import { describe, it, expect, beforeEach } from "vitest";
import FirestoreContactRequestRepository from "../FirestoreContactRequestRepository";
import { mockCollection, mockDoc, mockFirestore, resetFirestoreMocks } from "@/lib/test-utils/mocks/firebase.mocks";
import { FirebaseCollections } from "@/lib/database/collections";
import ContactRequest from "../../models/ContactRequest";

const contactRequestData: ContactRequest = {
    name: "Alice",
    email: "alice@example.com",
    message: "Hello"
};

describe("FirestoreContactRequestRepository", () => {
    beforeEach(() => {
        resetFirestoreMocks();
    });

    it("creates a new contact request and returns it with generated id and createdAt", async () => {
        mockDoc.id = "generatedId";
        mockDoc.set.mockResolvedValue(undefined);
        mockCollection.doc.mockReturnValue(mockDoc);

        const repo = new FirestoreContactRequestRepository(mockFirestore);
        const result = await repo.createContactRequest(contactRequestData);

        expect(result).toMatchObject({
            ...contactRequestData,
            id: "generatedId"
        });
        expect(result.createdAt).toBeDefined();
        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.ContactRequests);
        expect(mockCollection.doc).toHaveBeenCalled();
        expect(mockDoc.set).toHaveBeenCalledWith(expect.objectContaining({
            ...contactRequestData,
            id: "generatedId"
        }));
    });

    it("propagates errors from Firestore when set fails", async () => {
        const error = new Error("Firestore set error");
        mockDoc.id = "generatedId";
        mockDoc.set.mockRejectedValue(error);
        mockCollection.doc.mockReturnValue(mockDoc);

        const repo = new FirestoreContactRequestRepository(mockFirestore);

        await expect(repo.createContactRequest(contactRequestData)).rejects.toThrow("Firestore set error");
    });
});