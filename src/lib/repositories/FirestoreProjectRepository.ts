import ProjectRepository from "@/lib/repositories/interfaces/ProjectRepository";
import {inject, injectable} from "inversify";
import Project from "@/lib/models/Project";
import {FirebaseCollections} from "@/lib/database/collections";
import TYPES from "@/lib/di/types";

@injectable()
export default class FirestoreProjectRepository implements ProjectRepository {
    private firestore: FirebaseFirestore.Firestore;

    constructor(
        @inject(TYPES.Firestore) firestore: FirebaseFirestore.Firestore
    ) {
        this.firestore = firestore;
    }

    async getAllProjects(): Promise<Project[]> {
        const projectsSnapshot = await this.firestore
            .collection(FirebaseCollections.Projects)
            .orderBy('order', 'asc')
            .get();

        return projectsSnapshot.docs.map(doc => {
            const data = doc.data() as Project;
            return {
                ...data,
                id: doc.id
            };
        });
    }

    async getHomepageProjects(): Promise<Project[]> {
        const projectsSnapshot = await this.firestore
            .collection(FirebaseCollections.Projects)
            .where('shouldShowOnHomepage', '==', true)
            .orderBy('order', 'asc')
            .get();

        return projectsSnapshot.docs.map(doc => {
            const data = doc.data() as Project;
            return {
                ...data,
                id: doc.id
            };
        });
    }

    async getProjectById(id: string): Promise<Project | null> {
        const projectDoc = await this.firestore
            .collection(FirebaseCollections.Projects)
            .doc(id)
            .get();

        if (!projectDoc.exists) {
            return null;
        }

        const data = projectDoc.data() as Project;
        return {
            ...data,
            id: projectDoc.id
        };
    }

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const projectsSnapshot = await this.firestore
            .collection(FirebaseCollections.Projects)
            .where('slug', '==', slug)
            .limit(1)
            .get();

        if (projectsSnapshot.empty) {
            return null;
        }

        const projectDoc = projectsSnapshot.docs[0];
        const data = projectDoc.data() as Project;
        return {
            ...data,
            id: projectDoc.id
        };
    }
}