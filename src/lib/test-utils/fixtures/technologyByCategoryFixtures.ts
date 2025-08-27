import TechnologyCategory, {TechnologiesByCategory} from "@/lib/models/types/TechnologyCategory";
import Technology from "@/lib/models/Technology";

export const technologyFixture: Technology = {
    id: "react",
    name: "React",
    slug: "react",
    iconUrl: "https://example.com/react-icon.png",
    category: TechnologyCategory.Frontend,
    description: "React is a JavaScript library for building user interfaces.",
};

export const technologyByCategoryFixtures: TechnologiesByCategory[] = [
    {
        categoryName: TechnologyCategory.Frontend,
        techs: [
            technologyFixture,
            {
                id: "vue",
                name: "Vue.js",
                slug: "vue",
                iconUrl: "https://example.com/vue-icon.png",
                category: TechnologyCategory.Frontend,
                description: null,
            },
            {
                id: "angular",
                name: "Angular",
                slug: "angular",
                iconUrl: null,
                category: TechnologyCategory.Frontend,
                description: "Angular is a platform for building mobile and desktop web applications.",
            },
        ]
    }
];