import AboutMeRepository from "@/lib/repositories/interfaces/AboutMeRepository";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {inject, injectable} from "inversify";
import TYPES from "@/lib/di/types";
import AboutMe from "@/lib/models/AboutMe";
import {FirebaseCollections} from "@/lib/database/collections";
import {NotFoundError} from "@/lib/errors/errors";

@injectable()
export default class FirestoreAboutMeRepository implements AboutMeRepository {
    constructor(
        @inject(TYPES.Firestore) private db: Firestore
    ) {
    }

    async getAboutMe(): Promise<AboutMe> {
        const aboutMeDoc = await this.db
            .collection(FirebaseCollections.Settings)
            .doc("aboutMe")
            .get();

        if (!aboutMeDoc.exists) {
            return Promise.reject(new NotFoundError("About Me document does not exist"));
        }

        return aboutMeDoc.data() as AboutMe;
    }
}