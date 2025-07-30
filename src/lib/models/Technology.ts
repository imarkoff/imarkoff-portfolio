import TechnologyCategory from "@/lib/models/types/TechnologyCategory";

export default interface Technology {
    id: string;
    name: string;
    slug: string;
    iconUrl: string | null;
    category: TechnologyCategory;
    description: string | null;
}