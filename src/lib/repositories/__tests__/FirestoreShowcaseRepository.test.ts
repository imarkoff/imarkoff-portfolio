import { describe, it, expect, beforeEach } from "vitest";
import FirestoreShowcaseRepository from "../FirestoreShowcaseRepository";
import { mockCollection, mockFirestore, resetFirestoreMocks } from "@/lib/test-utils/mocks/firebase.mocks";
import { FirebaseCollections } from "@/lib/database/collections";
import {showcaseImageFixture} from "@/lib/test-utils/fixtures/showcaseImage.fixtures";

const showcaseImageData = showcaseImageFixture;

describe("FirestoreShowcaseRepository", () => {
    beforeEach(() => {
        resetFirestoreMocks();
    });

    it("returns an array of showcase images when documents exist", async () => {
        const mockDocs = [
            { id: "1", data: () => showcaseImageData },
            { id: "2", data: () => ({ ...showcaseImageData, title: "Image 2" }) }
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreShowcaseRepository(mockFirestore);
        const result = await repo.getShowcaseImages();

        expect(result).toEqual([
            { id: "1", ...showcaseImageData },
            { id: "2", ...showcaseImageData, title: "Image 2" }
        ]);
        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Showcases);
        expect(mockCollection.get).toHaveBeenCalled();
    });

    it("returns an empty array when no showcase documents exist", async () => {
        mockCollection.get.mockResolvedValue({ docs: [], empty: true });

        const repo = new FirestoreShowcaseRepository(mockFirestore);
        const result = await repo.getShowcaseImages();

        expect(result).toEqual([]);
    });

    it("propagates errors from Firestore when get fails", async () => {
        const error = new Error("Firestore get error");
        mockCollection.get.mockRejectedValue(error);

        const repo = new FirestoreShowcaseRepository(mockFirestore);

        await expect(repo.getShowcaseImages()).rejects.toThrow("Firestore get error");
    });
});