import { describe, it, expect, beforeEach } from "vitest";
import FirestoreAboutMeRepository from "../FirestoreAboutMeRepository";
import { NotFoundError } from "@/lib/errors/errors";
import {mockCollection, mockDoc, mockFirestore, resetFirestoreMocks} from "@/lib/test-utils/firebase-mock";
import {FirebaseCollections} from "@/lib/database/collections";

const aboutMeData = { name: "John Doe", fullDescription: "Developer" };

beforeEach(() => {
    resetFirestoreMocks();
});

describe("FirestoreAboutMeRepository", () => {
    it("returns AboutMe data when document exists", async () => {
        mockDoc.get.mockResolvedValue({ exists: true, data: () => aboutMeData });

        const repo = new FirestoreAboutMeRepository(mockFirestore);
        const result = await repo.getAboutMe();

        expect(result).toEqual(aboutMeData);
        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Settings);
        expect(mockCollection.doc).toHaveBeenCalledWith("aboutMe");
        expect(mockDoc.get).toHaveBeenCalled();
    });

    it("throws NotFoundError when document does not exist", async () => {
        mockDoc.get.mockResolvedValue({ exists: false });

        const repo = new FirestoreAboutMeRepository(mockFirestore);

        await expect(repo.getAboutMe()).rejects.toThrow(NotFoundError);
    });

    it("propagates errors from Firestore", async () => {
        const error = new Error("Firestore error");
        mockDoc.get.mockRejectedValue(error);

        const repo = new FirestoreAboutMeRepository(mockFirestore);

        await expect(repo.getAboutMe()).rejects.toThrow("Firestore error");
    });
});