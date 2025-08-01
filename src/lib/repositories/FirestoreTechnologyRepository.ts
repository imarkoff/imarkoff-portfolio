import TYPES from "@/lib/di/types";
import {FirebaseCollections} from "@/lib/database/collections";
import {inject, injectable} from "inversify";
import TechnologyRepository from "@/lib/repositories/interfaces/TechnologyRepository";
import Technology from "@/lib/models/Technology";

@injectable()
export default class FirestoreTechnologyRepository implements TechnologyRepository {
    constructor(
        @inject(TYPES.Firestore) private firestore: FirebaseFirestore.Firestore
    ) {
    }

    async getAllTechnologies(): Promise<Technology[]> {
        const snapshot = await this.firestore
            .collection(FirebaseCollections.Technologies)
            .get();

        return snapshot.docs.map(doc => ({
            ...doc.data() as Technology,
            id: doc.id
        }));
    }

    async getTechnologyBySlug(slug: string): Promise<Technology | null> {
        const snapshot = await this.firestore
            .collection(FirebaseCollections.Technologies)
            .where("slug", "==", slug)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return {
            ...doc.data() as Technology,
            id: doc.id
        };
    }

    async getTechnologiesBySlug(slugs: string[]): Promise<Technology[]> {
        const snapshot = await this.firestore
            .collection(FirebaseCollections.Technologies)
            .where("slug", "in", slugs)
            .get();

        return snapshot.docs.map(doc => ({
            ...doc.data() as Technology,
            id: doc.id
        }));
    }
}