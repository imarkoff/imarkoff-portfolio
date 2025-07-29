import {Container} from "inversify";
import TYPES from "@/lib/di/types";
import {db} from "@/lib/database/firestore";

import AboutMeRepository from "@/lib/repositories/interfaces/AboutMeRepository";
import ExperienceRepository from "@/lib/repositories/interfaces/ExperienceRepository";
import ProjectRepository from "@/lib/repositories/interfaces/ProjectRepository";
import ShowcaseRepository from "@/lib/repositories/interfaces/ShowcaseRepository";
import FirestoreAboutMeRepository from "@/lib/repositories/FirestoreAboutMeRepository";
import FirestoreExperienceRepository from "@/lib/repositories/FirestoreExperienceRepository";
import FirestoreProjectRepository from "@/lib/repositories/FirestoreProjectRepository";
import FirestoreShowcaseRepository from "@/lib/repositories/FirestoreShowcaseRepository";

import AboutMeGetter from "@/lib/services/interfaces/AboutMeGetter";
import ExperienceGetter from "@/lib/services/interfaces/ExperienceGetter";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";
import ShowcaseGetter from "@/lib/services/interfaces/ShowcaseGetter";
import AboutMeGetterImpl from "@/lib/services/AboutMeGetterImpl";
import ExperienceGetterImpl from "@/lib/services/ExperienceGetterImpl";
import ProjectGetterImpl from "@/lib/services/ProjectGetterImpl";
import ShowcaseGetterImpl from "@/lib/services/ShowcaseGetterImpl";

const container = new Container();

// External Dependencies Bindings
container.bind<FirebaseFirestore.Firestore>(TYPES.Firestore).toConstantValue(db);

// Repository Bindings
container.bind<AboutMeRepository>(TYPES.AboutMeRepository).to(FirestoreAboutMeRepository);
container.bind<ExperienceRepository>(TYPES.ExperienceRepository).to(FirestoreExperienceRepository);
container.bind<ProjectRepository>(TYPES.ProjectRepository).to(FirestoreProjectRepository);
container.bind<ShowcaseRepository>(TYPES.ShowcaseRepository).to(FirestoreShowcaseRepository);

// Service Bindings
container.bind<AboutMeGetter>(TYPES.AboutMeGetter).to(AboutMeGetterImpl);
container.bind<ExperienceGetter>(TYPES.ExperienceGetter).to(ExperienceGetterImpl);
container.bind<ProjectGetter>(TYPES.ProjectGetter).to(ProjectGetterImpl);
container.bind<ShowcaseGetter>(TYPES.ShowcaseGetter).to(ShowcaseGetterImpl);

export default container;