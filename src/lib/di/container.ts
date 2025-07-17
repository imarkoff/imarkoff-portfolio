import {Container} from "inversify";
import ProjectRepository from "@/lib/repositories/interfaces/ProjectRepository";
import FirestoreProjectRepository from "@/lib/repositories/FirestoreProjectRepository";
import TYPES from "@/lib/di/types";
import {db} from "@/lib/database/firestore";
import ProjectGetterImpl from "@/lib/services/ProjectGetterImpl";
import ProjectGetter from "@/lib/services/interfaces/ProjectGetter";

const container = new Container();

// External Dependencies Bindings
container.bind<FirebaseFirestore.Firestore>(TYPES.Firestore).toConstantValue(db);

// Repository Bindings
container.bind<ProjectRepository>(TYPES.ProjectRepository).to(FirestoreProjectRepository);

// Service Bindings
container.bind<ProjectGetter>(TYPES.ProjectGetter).to(ProjectGetterImpl);

export default container;