import { describe, it, expect, beforeEach } from "vitest";
import FirestoreProjectRepository from "@/lib/repositories/FirestoreProjectRepository";
import {mockCollection, mockDoc, mockFirestore, resetFirestoreMocks} from "@/lib/test-utils/mocks/firebase.mocks";
import { FirebaseCollections } from "@/lib/database/collections";

describe("FirestoreProjectRepository", () => {
    beforeEach(() => {
        resetFirestoreMocks();
    });

    it("returns all projects with ids when documents exist", async () => {
        const mockDocs = [
            { id: "1", data: () => ({ name: "Project1" }) },
            { id: "2", data: () => ({ name: "Project2" }) },
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreProjectRepository(mockFirestore);
        const result = await repo.getAllProjects();

        expect(result).toEqual([
            { name: "Project1", id: "1" },
            { name: "Project2", id: "2" },
        ]);
    });

    it("returns empty array when no projects exist", async () => {
        mockCollection.get.mockResolvedValue({ docs: [], empty: true });

        const repo = new FirestoreProjectRepository(mockFirestore);
        const result = await repo.getAllProjects();

        expect(result).toEqual([]);
    });

    it("returns homepage projects with ids when documents exist", async () => {
        const mockDocs = [
            { id: "1", data: () => ({ name: "HomepageProject1" }) },
            { id: "2", data: () => ({ name: "HomepageProject2" }) },
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreProjectRepository(mockFirestore);
        const result = await repo.getHomepageProjects();

        expect(result).toEqual([
            { name: "HomepageProject1", id: "1" },
            { name: "HomepageProject2", id: "2" },
        ]);
    });

    it("returns empty array when no homepage projects exist", async () => {
        mockCollection.get.mockResolvedValue({ docs: [], empty: true });

        const repo = new FirestoreProjectRepository(mockFirestore);
        const result = await repo.getHomepageProjects();

        expect(result).toEqual([]);
    });

    it("returns null when project by id does not exist", async () => {
        mockDoc.exists = false;

        const repo = new FirestoreProjectRepository(mockFirestore);
        const result = await repo.getProjectById("nonexistentId");

        expect(result).toBeNull();
    });

    it("returns project with id when project by id exists", async () => {
        mockDoc.get.mockResolvedValue({
            exists: true,
            id: "projectId",
            data: () => ({ name: "ProjectById" }),
        });

        const repo = new FirestoreProjectRepository(mockFirestore);
        const result = await repo.getProjectById("projectId");

        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Projects);
        expect(mockCollection.doc).toHaveBeenCalledWith("projectId");
        expect(mockDoc.get).toHaveBeenCalled();
        expect(result).toEqual({ name: "ProjectById", id: "projectId" });
    });

    it("returns null when project by slug does not exist", async () => {
        mockCollection.get.mockResolvedValue({ empty: true, docs: [] });

        const repo = new FirestoreProjectRepository(mockFirestore as any);
        const result = await repo.getProjectBySlug("nonexistent-slug");

        expect(result).toBeNull();
    });

    it("returns project with id when project by slug exists", async () => {
        const mockProjectDoc = { id: "slugId", data: () => ({ name: "ProjectBySlug" }) };
        mockCollection.get.mockResolvedValue({ empty: false, docs: [mockProjectDoc] });

        const repo = new FirestoreProjectRepository(mockFirestore);
        const result = await repo.getProjectBySlug("test-slug");

        expect(mockFirestore.collection).toHaveBeenCalledWith(FirebaseCollections.Projects);
        expect(mockCollection.where).toHaveBeenCalledWith("slug", "==", "test-slug");
        expect(mockCollection.limit).toHaveBeenCalledWith(1);
        expect(mockCollection.get).toHaveBeenCalled();
        expect(result).toEqual({ name: "ProjectBySlug", id: "slugId" });
    });

    it("handles documents with missing data gracefully in getAllProjects", async () => {
        const mockDocs = [
            { id: "1", data: () => undefined },
            { id: "2", data: () => ({ name: "Project2" }) },
        ];
        mockCollection.get.mockResolvedValue({ docs: mockDocs, empty: false });

        const repo = new FirestoreProjectRepository(mockFirestore);
        const result = await repo.getAllProjects();

        expect(result).toEqual([
            { id: "1" },
            { name: "Project2", id: "2" },
        ]);
    });

    it("throws if db.get rejects in getAllProjects", async () => {
        mockCollection.get.mockRejectedValue(new Error("Firestore error"));

        const repo = new FirestoreProjectRepository(mockFirestore);

        await expect(repo.getAllProjects()).rejects.toThrow("Firestore error");
    });
});