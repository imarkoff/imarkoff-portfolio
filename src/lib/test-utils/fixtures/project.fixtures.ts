import Project from "@/lib/models/Project";
import TechnologyCategory from "@/lib/models/types/TechnologyCategory";

const projectFixtures: Project[] = [
    {
        id: '1',
        name: 'Project 1',
        slug: 'project-1',
        order: 1,
        shortDescription: 'Short description 1',
        fullDescription: 'Full description 1',
        type: 'fullstack',
        heroImage: {
            src: 'https://example.com/image1.jpg',
            alt: 'Project 1 Hero Image',
            width: 1200,
            height: 800
        },
        coreTechs: ['React', 'Node.js'],
        shouldShowOnHomepage: true,
        keyFeatures: ['Feature 1', 'Feature 2'],
        fullTechStack: [
            {
                categoryName: TechnologyCategory.Frontend,
                techs: ['react', 'redux']
            },
            {
                categoryName: TechnologyCategory.Backend,
                techs: ['nodejs', 'express']
            },
            {
                categoryName: TechnologyCategory.Database,
                techs: ['mongodb']
            },
            {
                categoryName: TechnologyCategory.Devops,
                techs: ['docker', 'kubernetes']
            }
        ],
        challenges: [
            { title: 'Challenge 1', description: 'Description of challenge 1' },
            { title: 'Challenge 2', description: 'Description of challenge 2' }
        ],
        screenshots: ['https://example.com/screenshot1.jpg', 'https://example.com/screenshot2.jpg'],
        liveDemoUrl: 'https://example.com/demo1',
        sourceCodeUrl: null,
        colors: {
            primaryHue: 210,
            background: '#f0f0f0'
        },
        githubStats: null
    },
    {
        id: '2',
        name: 'Project 2',
        slug: 'project-2',
        order: 2,
        shortDescription: 'Short description 2',
        fullDescription: 'Full description 2',
        type: 'frontend',
        heroImage: {
            src: 'https://example.com/image2.jpg',
            alt: 'Project 2 Hero Image',
            width: 1200,
            height: 800
        },
        coreTechs: ['Vue.js', 'Tailwind CSS'],
        shouldShowOnHomepage: false,
        keyFeatures: ['Feature A', 'Feature B'],
        fullTechStack: [
            {
                categoryName: TechnologyCategory.Frontend,
                techs: ['vue', 'tailwindcss']
            },
            {
                categoryName: TechnologyCategory.Devops,
                techs: ['netlify']
            }
        ],
        challenges: [
            { title: 'Challenge A', description: 'Description of challenge A' }
        ],
        screenshots: ['https://example.com/screenshot3.jpg'],
        liveDemoUrl: null,
        sourceCodeUrl: 'https://example.com/source2',
        colors: null,
        githubStats: {
            show: true,
            stars: 150
        }
    }
];

export default projectFixtures;