import ExperienceRepository from "@/lib/repositories/interfaces/ExperienceRepository";
import {inject, injectable} from "inversify";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import TYPES from "@/lib/di/types";
import ExperienceItem from "../models/ExperienceItem";
import {FirebaseCollections} from "@/lib/database/collections";

@injectable()
export default class FirestoreExperienceRepository implements ExperienceRepository {

    constructor(
        @inject(TYPES.Firestore) private db: Firestore
    ) {
    }

    async getExperience(): Promise<ExperienceItem[]> {
        const experienceDoc = await this.db
            .collection(FirebaseCollections.Experience)
            .orderBy("isCurrent", "desc")
            .orderBy("startDate", "desc")
            .get();

        return experienceDoc.docs.map(doc => {
            const data = doc.data() as ExperienceItem;
            return {
                ...data,
                id: doc.id
            };
        });
    }
}