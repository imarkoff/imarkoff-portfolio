import {TechnologiesSlugsByCategory} from "@/lib/models/types/TechnologyCategory";
import BackendImage from "@/lib/models/types/BackendImage";
import ProjectType from "@/lib/models/types/ProjectType";

export default interface Project {
    id: string;
    slug: string;
    name: string;
    type: ProjectType | null;
    shortDescription: string;
    heroImage: BackendImage;
    coreTechs: string[];
    shouldShowOnHomepage: boolean;
    fullDescription: string;
    keyFeatures: string[];
    fullTechStack: TechnologiesSlugsByCategory[];
    challenges: ProjectChallenge[];
    githubStats: GithubStats | null;
    screenshots: string[];
    liveDemoUrl: string | null;
    sourceCodeUrl: string | null;
    order: number;
}

export interface ProjectChallenge {
    title: string;
    description: string;
}

export interface GithubStats {
    show: boolean;
    stars: number | null;
}