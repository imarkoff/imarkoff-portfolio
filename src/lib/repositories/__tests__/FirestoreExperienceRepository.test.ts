import { describe, it, expect, beforeEach } from "vitest";
import FirestoreExperienceRepository from "@/lib/repositories/FirestoreExperienceRepository";
import {mockCollection, mockFirestore, resetFirestoreMocks} from "@/lib/test-utils/firebase-mock";
import {FirebaseCollections} from "@/lib/database/collections";

beforeEach(() => {
    resetFirestoreMocks();
});

describe("FirestoreExperienceRepository", () => {
    it("calls getExperience with correct ordering", async () => {
        const repo = new FirestoreExperienceRepository(mockFirestore);
        await repo.getExperience();

        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Experience);
        expect(mockCollection.orderBy).toHaveBeenCalledWith("isCurrent", "desc");
        expect(mockCollection.orderBy).toHaveBeenCalledWith("startDate", "desc");
    });

    it("returns experience items with ids when documents exist", async () => {
        const mockDocs = [
            { id: "1", data: () => ({ name: "Exp1" }) },
            { id: "2", data: () => ({ name: "Exp2" }) },
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreExperienceRepository(mockFirestore);
        const result = await repo.getExperience();

        expect(mockCollection.get).toHaveBeenCalled();
        expect(result).toEqual([
            { name: "Exp1", id: "1" },
            { name: "Exp2", id: "2" },
        ]);
    });

    it("returns empty array when no documents exist", async () => {
        mockCollection.get.mockResolvedValue({ docs: [], empty: true });

        const repo = new FirestoreExperienceRepository(mockFirestore);
        const result = await repo.getExperience();

        expect(mockCollection.get).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    it("handles documents with missing data gracefully", async () => {
        const mockDocs = [
            { id: "1", data: () => undefined },
            { id: "2", data: () => ({ name: "Exp2" }) },
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreExperienceRepository(mockFirestore);
        const result = await repo.getExperience();

        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Experience);
        expect(mockCollection.get).toHaveBeenCalled();
        expect(result).toEqual([
            { id: "1" },
            { name: "Exp2", id: "2" },
        ]);
    });

    it("throws if db.get rejects", async () => {
        mockCollection.get.mockRejectedValue(new Error("Firestore error"));

        const repo = new FirestoreExperienceRepository(mockFirestore);

        await expect(repo.getExperience()).rejects.toThrow("Firestore error");
    });
});