import { vi } from 'vitest';
import { mockFirestore } from "@/lib/test-utils/mocks/firebase.mocks";

vi.mock('@/lib/database/firestore', () => ({
    db: mockFirestore, // 'db' is the named export from firestore.ts
}));