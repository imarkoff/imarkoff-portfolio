import { vi } from 'vitest';
import { Firestore } from 'firebase-admin/firestore';

// Create a mock for Firestore's 'db' instance and its chainable methods
// These mocks are generic and can be reused across different repository tests.

export const mockDoc = {
    get: vi.fn(),
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    exists: false,
    id: 'mockDocId',
    data: vi.fn(() => null)
};

export const mockCollection = {
    doc: vi.fn(() => mockDoc),
    get: vi.fn(() => Promise.resolve({ docs: [] as any[], empty: true })),
    add: vi.fn(() => Promise.resolve(mockDoc)),
    where: vi.fn(() => mockCollection),
    orderBy: vi.fn(() => mockCollection),
    limit: vi.fn(() => mockCollection),
    // Add other collection methods if your repo uses them (e.g., .onSnapshot())
};

export const mockFirestore = {
    collection: vi.fn(() => mockCollection),
    // Add other top-level Firestore methods if your repo uses them (e.g., .batch(), .runTransaction())
} as unknown as Firestore;

/**
 * Resets all mocks related to the Firestore instance.
 * Call this in beforeEach() to ensure test isolation.
 */
export const resetFirestoreMocks = () => {
    vi.clearAllMocks();
    (mockFirestore as any).collection.mockReturnValue(mockCollection);

    mockCollection.doc.mockReturnValue(mockDoc);
    mockCollection.get.mockResolvedValue({ docs: [], empty: true });
    mockCollection.add.mockResolvedValue(mockDoc);
    mockCollection.where.mockReturnValue(mockCollection);
    mockCollection.orderBy.mockReturnValue(mockCollection);
    mockCollection.limit.mockReturnValue(mockCollection);

    mockDoc.get.mockResolvedValue({ exists: false, data: () => null });
    mockDoc.set.mockResolvedValue(undefined);
    mockDoc.update.mockResolvedValue(undefined);
    mockDoc.delete.mockResolvedValue(undefined);
    mockDoc.exists = false;
    mockDoc.id = 'mockDocId';
    mockDoc.data = vi.fn(() => null);
    mockDoc.get.mockResolvedValue({ exists: false, data: () => null });
};