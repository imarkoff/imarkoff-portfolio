import { describe, it, expect, beforeEach } from "vitest";
import FirestoreTechnologyRepository from "../FirestoreTechnologyRepository";
import { mockCollection, mockFirestore, resetFirestoreMocks } from "@/lib/test-utils/mocks/firebase.mocks";
import { FirebaseCollections } from "@/lib/database/collections";

const technologyData = { slug: "react", name: "React", description: "A JS library" };

describe("FirestoreTechnologyRepository", () => {
    beforeEach(() => {
        resetFirestoreMocks();
    });

    it("returns all technologies when documents exist", async () => {
        const mockDocs = [
            { id: "1", data: () => technologyData },
            { id: "2", data: () => ({ ...technologyData, slug: "vue", name: "Vue" }) }
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreTechnologyRepository(mockFirestore);
        const result = await repo.getAllTechnologies();

        expect(result).toEqual([
            { id: "1", ...technologyData },
            { id: "2", ...technologyData, slug: "vue", name: "Vue" }
        ]);
        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Technologies);
        expect(mockCollection.get).toHaveBeenCalled();
    });

    it("returns an empty array when no technology documents exist", async () => {
        mockCollection.get.mockResolvedValue({ docs: [], empty: true });

        const repo = new FirestoreTechnologyRepository(mockFirestore);
        const result = await repo.getAllTechnologies();

        expect(result).toEqual([]);
    });

    it("returns a technology by slug when found", async () => {
        const mockDocs = [
            { id: "1", data: () => technologyData }
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreTechnologyRepository(mockFirestore);
        const result = await repo.getTechnologyBySlug("react");

        expect(result).toEqual({ id: "1", ...technologyData });
        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Technologies);
        expect(mockCollection.where).toHaveBeenCalledWith("slug", "==", "react");
    });

    it("returns null when technology by slug is not found", async () => {
        mockCollection.get.mockResolvedValue({ docs: [], empty: true })

        const repo = new FirestoreTechnologyRepository(mockFirestore);
        const result = await repo.getTechnologyBySlug("nonexistent");

        expect(result).toBeNull();
    });

    it("returns technologies by slugs in the same order as input", async () => {
        const mockDocs = [
            { id: "1", data: () => ({ ...technologyData, slug: "react" }) },
            { id: "2", data: () => ({ ...technologyData, slug: "vue", name: "Vue" }) }
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreTechnologyRepository(mockFirestore);
        const result = await repo.getTechnologiesBySlug(["vue", "react"]);

        expect(result).toEqual([
            { id: "2", ...technologyData, slug: "vue", name: "Vue" },
            { id: "1", ...technologyData, slug: "react" }
        ]);
        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Technologies);
        expect(mockCollection.where).toHaveBeenCalledWith("slug", "in", ["vue", "react"]);
    });

    it("returns an empty array when getTechnologiesBySlug is called with an empty array", async () => {
        const repo = new FirestoreTechnologyRepository(mockFirestore);
        const result = await repo.getTechnologiesBySlug([]);

        expect(result).toEqual([]);
    });
});