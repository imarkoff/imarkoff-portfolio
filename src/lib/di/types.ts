/**
 * Constants for Dependency Injection Types
 * It is used to define unique symbols for each type of dependency
 */
const TYPES = {
    // Repositories
    AboutMeRepository: Symbol.for('AboutMeRepository'),
    ContactRequestRepository: Symbol.for('ContactRequestRepository'),
    ExperienceRepository: Symbol.for('ExperienceRepository'),
    ProjectRepository: Symbol.for('ProjectRepository'),
    ShowcaseRepository: Symbol.for('ShowcaseRepository'),
    TechnologyRepository: Symbol.for('TechnologyRepository'),

    // Services
    AboutMeGetter: Symbol.for('AboutMeGetter'),
    ContactRequestService: Symbol.for('ContactRequestService'),
    ExperienceGetter: Symbol.for('ExperienceGetter'),
    ProjectGetter: Symbol.for('ProjectGetter'),
    ShowcaseGetter: Symbol.for('ShowcaseGetter'),
    TechnologyGetter: Symbol.for('TechnologyGetter'),

    // External Dependencies
    Firestore: Symbol.for('FirebaseFirestore.Firestore'),
};

export default TYPES;