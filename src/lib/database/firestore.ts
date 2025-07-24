import {App, cert, getApps, initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

/**
 * FirebaseAdminInitializer is a utility class to initialize Firebase Admin SDK.
 * It checks if Firebase is already initialized, whether it is in test mode,
 * and verifies the necessary environment variables before initializing Firebase.
 */
class FirebaseAdminInitializer {
    static initialize(): App {
        if (this.checkIsInitialized()) {
            console.log('Firebase is already initialized.');
            return getApps()[0];
        }

        if (this.checkIfInTestMode()) {
            console.log('Running in test mode, skipping Firebase initialization.');
        }
        else {
            this.checkEnvironmentVariables();
        }

        return this.initializeFirebase();
    }

    private static checkIsInitialized() {
        return getApps().length > 0;
    }

    private static checkIfInTestMode() {
        return process.env.FIREBASE_IN_TEST_MODE === 'true';
    }

    private static checkEnvironmentVariables() {
        if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
        }
    }

    private static initializeFirebase() {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');

            initializeApp({
                credential: cert(serviceAccount),
            });

            console.log('Firebase initialized successfully.');
            return getApps()[0];
        } catch (error) {
            console.error('Error initializing Firebase:', error);
            throw error;
        }
    }
}

FirebaseAdminInitializer.initialize();

const db = getFirestore();

export { db };