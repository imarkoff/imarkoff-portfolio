import {TechnologiesByCategories} from "@/lib/models/types/TechnologyCategory";

export default interface AboutMe {
    name: string;
    surname: string | null;
    tagline: string;
    socialLinks: SocialLink[];
    resumeUrl: string;
    contactEmail: string;
    fullDescription: string;
    byTheNumbers: ByTheNumbers[];
    technologiesCategories: TechnologiesByCategories;
}

export interface SocialLink {
    platform: string;
    url: string;
}

export interface ByTheNumbers {
    iconName: string;
    label: string;
    value: number;
    valueSuffix: string | null;
}