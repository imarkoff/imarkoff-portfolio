import {TechnologiesByCategories} from "@/lib/models/types/TechnologyCategory";

export default interface Project {
    id: string;
    slug: string;
    name: string;
    type: string | null;
    shortDescription: string;
    heroImage: string;
    coreTechs: string[];
    shouldShowOnHomepage: boolean;
    fullDescription: string;
    keyFeatures: string[];
    fullTechStack: TechnologiesByCategories;
    challenges: ProjectChallenge[];
    screenshots: string[];
    liveDemoUrl: string | null;
    sourceCodeUrl: string | null;
    order: number;
}

export interface ProjectChallenge {
    title: string;
    description: string;
}