type TechnologyCategory =
    "languages" |
    "frontend" |
    "backend" |
    "database" |
    "devops" |
    "other";

export type TechnologiesByCategories = {
    [K in TechnologyCategory]?: string[]
}

export default TechnologyCategory;