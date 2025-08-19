import {TechnologiesSlugsByCategory} from "@/lib/models/types/TechnologyCategory";

export default interface AboutMe {
    name: string;
    surname: string | null;
    tagline: string;
    socialLinks: SocialLink[];
    resumeUrl: string | null;
    contactEmail: string;
    fullDescription: string;
    byTheNumbers: ByTheNumbers[];
    technologiesCategories: TechnologiesSlugsByCategory[];
}

export interface SocialLink {
    platform: string;
    username: string;
}

export interface ByTheNumbers {
    iconName: string;
    label: string;
    value: number;
    valueSuffix: string | null;
}