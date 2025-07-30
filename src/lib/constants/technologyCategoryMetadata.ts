import TechnologyCategory from "@/lib/models/types/TechnologyCategory";
import {IconName} from "@/components/icons/IconMap";

type TechnologyCategoryMetadata = {
    name: string;
    slug: string;
    icon: IconName
}

/**
 * Maps technology categories to their display metadata.
 * Used for rendering category sections, icons, and URLs throughout the application.
 */
const technologyCategoryMetadata: Record<TechnologyCategory, TechnologyCategoryMetadata> = {
    [TechnologyCategory.Languages]: {
        name: "Languages",
        slug: "languages",
        icon: "code"
    },
    [TechnologyCategory.Frontend]: {
        name: "Front-end",
        slug: "frontend",
        icon: "web"
    },
    [TechnologyCategory.Backend]: {
        name: "Back-end",
        slug: "backend",
        icon: "memory"
    },
    [TechnologyCategory.Database]: {
        name: "Database",
        slug: "database",
        icon: "database"
    },
    [TechnologyCategory.Devops]: {
        name: "DevOps",
        slug: "devops",
        icon: "dns"
    },
    [TechnologyCategory.Testing]: {
        name: "Testing",
        slug: "testing",
        icon: "bug_report"
    },
    [TechnologyCategory.Other]: {
        name: "Other",
        slug: "other",
        icon: "more_horiz"
    }
}

export default technologyCategoryMetadata;