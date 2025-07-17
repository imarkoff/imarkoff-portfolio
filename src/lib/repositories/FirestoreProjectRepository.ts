import ProjectRepository from "@/lib/repositories/interfaces/ProjectRepository";
import {inject, injectable} from "inversify";
import Project from "@/lib/models/Project";
import {FirebaseCollections} from "@/lib/database/collections";
import TYPES from "@/lib/di/types";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;

@injectable()
export default class FirestoreProjectRepository implements ProjectRepository {
    constructor(
        @inject(TYPES.Firestore) private db: Firestore
    ) {
    }

    async getAllProjects(): Promise<Project[]> {
        const projectsSnapshot = await this.db
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
        const projectsSnapshot = await this.db
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
        const projectDoc = await this.db
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
        const projectsSnapshot = await this.db
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