/**
 * Constants for Dependency Injection Types
 */
const TYPES = {
    // Repositories
    ProjectRepository: Symbol.for('ProjectRepository'),

    // Services
    ProjectGetter: Symbol.for('ProjectGetter'),

    // External Dependencies
    Firestore: Symbol.for('FirebaseFirestore.Firestore'),
};

export default TYPES;