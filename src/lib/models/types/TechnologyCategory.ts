import Technology from "@/lib/models/Technology";

enum TechnologyCategory {
    Languages = "languages",
    Frontend = "frontend",
    Backend = "backend",
    Database = "database",
    Devops = "devops",
    Testing = "testing",
    Other = "other",
}

export type TechnologiesSlugsByCategory = {
    categoryName: TechnologyCategory;
    techs: string[];
}

export type TechnologiesByCategory = {
    categoryName: TechnologyCategory;
    techs: Technology[];
}

export default TechnologyCategory;