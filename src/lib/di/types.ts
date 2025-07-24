/**
 * Constants for Dependency Injection Types
 * It is used to define unique symbols for each type of dependency
 */
const TYPES = {
    // Repositories
    AboutMeRepository: Symbol.for('AboutMeRepository'),
    ExperienceRepository: Symbol.for('ExperienceRepository'),
    ProjectRepository: Symbol.for('ProjectRepository'),

    // Services
    AboutMeGetter: Symbol.for('AboutMeGetter'),
    ExperienceGetter: Symbol.for('ExperienceGetter'),
    ProjectGetter: Symbol.for('ProjectGetter'),

    // External Dependencies
    Firestore: Symbol.for('FirebaseFirestore.Firestore'),
};

export default TYPES;