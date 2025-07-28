import TYPES from "@/lib/di/types";
import {inject, injectable} from "inversify";
import {Firestore} from "firebase-admin/firestore";
import ShowcaseImage from "@/lib/models/ShowcaseImage";
import ShowcaseRepository from "@/lib/repositories/interfaces/ShowcaseRepository";
import {FirebaseCollections} from "@/lib/database/collections";

@injectable()
export default class FirestoreShowcaseRepository implements ShowcaseRepository {
    constructor(
        @inject(TYPES.Firestore) private firestore: Firestore,
    ) {
    }

    async getShowcaseImages(): Promise<ShowcaseImage[]> {
        const snapshot = await this.firestore
            .collection(FirebaseCollections.Showcases)
            .get();
        return snapshot.docs.map(doc => {
            const data = doc.data() as ShowcaseImage;
            return {
                id: doc.id,
                ...data
            }
        });
    }
}